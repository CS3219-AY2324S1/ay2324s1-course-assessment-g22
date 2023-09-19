const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware
const config = require('./config.js');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
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

// GET /api/users/:username - Retrieve user details by username
app.get('/api/users/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const query = 'SELECT * FROM userAccounts WHERE username = $1';
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Fail to receive username.' });
  }
});

// POST /api/users - Create a new user
app.post('/api/users', async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  try {
    const query =
      'INSERT INTO userAccounts (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(query, [username, email, password, firstname, lastname]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'A user with this username or email already exists.' });
  }
});

// PUT /api/users/ - Update user details
app.put('/api/users', async (req, res) => {
  const { oldUsername, newUsername, email, password, firstname, lastname } = req.body;
  try {
    const query =
      'UPDATE userAccounts SET username = $2, email = $3, password = $4, firstname = $5, lastname = $6 WHERE username = $1 RETURNING *';
    const result = await pool.query(query, [oldUsername, newUsername, email, password, firstname, lastname]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/users/:username - Delete a user by username
app.delete('/api/users/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const query = 'DELETE FROM userAccounts WHERE username = $1 RETURNING *';
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(4000, () => console.log('Example app is listening on port 4000.'));
