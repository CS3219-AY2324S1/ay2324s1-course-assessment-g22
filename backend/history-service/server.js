const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config.js");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: [config.services.frontend.URL, config.services.matching.URL, config.services.collab.URL]
};

app.use(cors(corsOptions));

const dbConfig = config.database;
const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
});

const historyUrlPrefix = "/api/history";

function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: `Access denied. No token provided.` });
    }
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: `Access denied. Not Bearer Token.` });
    }
    const token = authHeader.substring(7, authHeader.length);
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const currentTimeInSeconds = Date.now();
        if (!decoded.exp || currentTimeInSeconds > decoded.exp) {
            return res.status(401).json({ error: "Token has expired." });
        }
        req.user = decoded.username; // Store the decoded user information in the request object
        next(); // Move to the next middleware
    } catch (error) {
        temp = error;
        res.status(400).json({ error: `Invalid token.` });
    }
}

// Create history of collab
app.post(`${historyUrlPrefix}`, async (req, res) => {
    try {
        const { current_username, other_username, roomid, time_started, time_ended, question, language_used, code, 
            difficulty } = req.body;
        const query = `INSERT INTO history 
        (current_username, other_username, roomid, time_started, time_ended, question, language_used, code, difficulty) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        // Inserting the first user into history
        await pool.query(query, [current_username, other_username, roomid,
            time_started, time_ended, question, language_used, code, difficulty]);

        // Inserting the second user into history
        await pool.query(query, [other_username, current_username, roomid,
            time_started, time_ended, question, language_used, code, difficulty]);
        res.status(201).json({ Message: "Successfully created history of collaboration between users" });
    } catch (error) {
        console.error("Error in inserting history data", error);
        res.status(500).json({ error: "Error in inserting history data" });
    }
});

// Update code of collab
app.put(`${historyUrlPrefix}`, async (req, res) => {
    try {
        const { roomid, code } = req.body;
        const query = `UPDATE history
        SET code = $2
        WHERE roomid = $1
        AND time_started IN (
            SELECT time_started
            FROM history
            WHERE roomid = $1
            ORDER BY time_started DESC
            LIMIT 2
        ) RETURNING *` ;
        const result = await pool.query(query, [roomid, code]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "No history of collaboration found" })
        }
        else {
            res.status(201).json({ Message: "Successfully updated history of collaboration" });
        }
    } catch (error) {
        console.error("Error updating history of collaboration:", error);
        res.status(500).json({ error: "Error updating history of collaboration" });
    }
});

// Update language used of collab
app.put(`${historyUrlPrefix}/language`, async (req, res) => {
    try {
        const { roomid, language_used } = req.body;
        const query = `UPDATE history
        SET language_used = $2
        WHERE roomid = $1
        AND time_started IN (
            SELECT time_started
            FROM history
            WHERE roomid = $1
            ORDER BY time_started DESC
            LIMIT 2
        ) RETURNING *` ;
        const result = await pool.query(query, [roomid, language_used]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "No history of collaboration found" })
        }
        else {
            res.status(201).json({ Message: "Successfully updated history of collaboration" });
        }
    } catch (error) {
        console.error("Error updating history of collaboration:", error);
        res.status(500).json({ error: "Error updating history of collaboration" });
    }
});

// Update time ended of collab
app.put(`${historyUrlPrefix}/endtime`, async (req, res) => {
    try {
        const { roomid } = req.body;
        const time_ended = new Date(Date.now()).toISOString();
        const query = `UPDATE history
        SET time_ended = $2
        WHERE roomid = $1
        AND time_started IN (
            SELECT time_started
            FROM history
            WHERE roomid = $1
            ORDER BY time_started DESC
            LIMIT 2
        ) RETURNING *` ;
        const result = await pool.query(query, [roomid, time_ended]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "No history of collaboration found" })
        }
        else {
            res.status(201).json({ Message: "Successfully updated end time of collaboration" });
        }
    } catch (error) {
        console.error("Error updating end time of collaboration:", error);
        res.status(500).json({ error: "Error updating end time of collaboration" });
    }
});

// Get history of collab
app.get(`${historyUrlPrefix}`, verifyToken, async (req, res) => {
    try {
        const username = req.user;
        const query = `SELECT other_username, time_started, time_ended, question, language_used, code 
        FROM history WHERE current_username = $1 and time_ended IS NOT NULL`;
        const result = await pool.query(query, [username]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "No history of collaboration found" })
        } else {
            res.json(result.rows);
        }
    } catch (error) {
        console.error("Error getting history of collaboration:", error);
        res.status(500).json({ error: "Error getting history of collaboration" });
    }
});

// Get history of collab for stats
app.get(`${historyUrlPrefix}/stats`, verifyToken, async (req, res) => {
    try {
        const username = req.user;
        const query = `SELECT difficulty, time_started FROM history
        where current_username = $1 and time_ended IS NOT NULL`;
        const result = await pool.query(query, [username]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "No history of collaboration found" })
        } else {
            res.json(result.rows);
        }
    } catch (error) {
        console.error("Error getting stats of history of collaboration:", error);
        res.status(500).json({ error: "Error getting stats of history of collaboration" });
    }
});

// Get code for latest collab
app.get(`${historyUrlPrefix}/:roomid`, async (req, res) => {
    try {
        const roomid = req.params.roomid;
        const query = `SELECT code FROM history WHERE roomid = $1 
        ORDER BY time_started DESC LIMIT 1`;
        const result = await pool.query(query, [roomid]);
        res.json(result.rows);
        console.log("Successfully retrieved code of collaboration");
    } catch (error) {
        console.error("Error getting code of collaboration:", error);
        res.status(500).json({ error: "Error getting code of collaboration" });
    }
});

// Get language used for latest collab
app.get(`${historyUrlPrefix}/language/:roomid`, async (req, res) => {
    try {
        const roomid = req.params.roomid;
        const query = `SELECT language_used FROM history WHERE roomid = $1 
        ORDER BY time_started DESC LIMIT 1`;
        const result = await pool.query(query, [roomid]);
        res.json(result.rows);
        console.log("Successfully retrieved language used of collaboration");
    } catch (error) {
        console.error("Error getting language used of collaboration:", error);
        res.status(500).json({ error: "Error getting language used of collaboration" });
    }
});


app.listen(5003, () => {
    console.log("History Service listening on port 5003");
});


