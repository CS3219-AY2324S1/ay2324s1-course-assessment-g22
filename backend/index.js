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

// pool.query('SELECT * FROM userAccounts', (error, result) => {
//   if (error) {
//     console.error('Error executing query:', error);
//   } else {
//     console.log('Query result:', result.rows);
//   }
//   // Release the client back to the pool
//   pool.end();
// });

app.get('/api/user-accounts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM userAccounts');
    const rows = result.rows;

    // Print the rows to the console
    console.log('User Account Rows:', rows);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(4000, () => console.log('Example app is listening on port 4000.'));
