CREATE TABLE IF NOT EXISTS userAccounts (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

