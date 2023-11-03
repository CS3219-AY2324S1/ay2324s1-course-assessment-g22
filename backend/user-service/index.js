const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const config = require("./config.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

// Ensure this time is equivilant as the one set in frontend that's in minutes
const TOKEN_EXPIRE_TIME = 900000; // in milliseconds

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: config.services.frontend.URL,
};
app.use(cors(corsOptions)); // Use the cors middleware

// Database connection configuration
const dbConfig = config.database;
const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

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
    if (decoded.exp && currentTimeInSeconds > decoded.exp) {
      return res.status(401).json({ error: "Token has expired." });
    }
    req.user = decoded.username;
    next(); // Move to the next middleware
  } catch (error) {
    res.status(400).json({ error: `Error while verifying token. ${error}` });
  }
}

// POST /api/login - Login with JWT
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const query =
      "SELECT * FROM userAccounts WHERE username = $1 and password = $2";
    const result = await pool.query(query, [username, password]);
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Incorrect username or Password" });
    } else {
      const user = result.rows[0];
      const exp = Date.now() + TOKEN_EXPIRE_TIME;
      const token = jwt.sign(
        { username: user.username, role: user.role, exp: exp },
        config.jwtSecret
      );
      res.status(200).json({
        username: user.username,
        role: user.role,
        token: token,
        exp: exp,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Incorrect username or Password" });
  }
});

// GET /api/refresh - Refresh JWT token
app.get("/api/refresh", verifyToken, async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader.substring(7, authHeader.length);
    const decoded = jwt.verify(token, config.jwtSecret);

    const newExp = Date.now() + TOKEN_EXPIRE_TIME;
    const newToken = jwt.sign(
      { username: decoded.username, role: decoded.role, exp: newExp },
      config.jwtSecret
    );

    res.status(200).json({
      username: decoded.username,
      role: decoded.role,
      token: newToken,
      exp: newExp,
    });
  } catch (error) {
    res.status(400).json({ error: `Error Refreshing Token: ${error}` });
  }
});

// GET /api/users/:username - Retrieve user details by username
app.get("/api/users/:username", verifyToken, async (req, res) => {
  const username = req.params.username;
  try {
    const query =
      "SELECT user_id, username, email, firstname, lastname FROM userAccounts WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Fail to receive username." });
  }
});

// GET /api/user - Retrieve username of user
app.get("/api/user/", verifyToken, async (req, res) => {
  const username = req.user;
  try {
    const query =
      "SELECT user_id, username, email, firstname, lastname FROM userAccounts WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Fail to receive username." });
  }
});

// POST /api/users - Create a new user
app.post("/api/users", async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  try {
    const query =
      "INSERT INTO userAccounts (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(query, [
      username,
      email,
      password,
      firstname,
      lastname,
    ]);
    res.status(201).json({ Message: "Successfully Created User" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "A user with this username or email already exists." });
  }
});

// PUT /api/users/ - Update user details
app.put("/api/users", verifyToken, async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  if (req.user !== username) {
    return res.status(401).json({ error: "Access denied." });
  }

  try {
    const query =
      "UPDATE userAccounts SET email = $2, firstname = $3, lastname = $4 WHERE username = $1 RETURNING *";
    const result = await pool.query(query, [
      username,
      email,
      firstname,
      lastname,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: "New Username or Email is already in use." });
  }
});

// DELETE /api/users/:username - Delete a user by username
app.delete("/api/users/:username", verifyToken, async (req, res) => {
  const username = req.params.username;

  if (req.user !== username) {
    return res.status(401).json({ error: "Access denied." });
  }

  try {
    const query = "DELETE FROM userAccounts WHERE username = $1 RETURNING *";
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Testing route
app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(4000, () => console.log("User database is listening on port 4000."));
