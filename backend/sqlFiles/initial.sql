CREATE TABLE userAccounts (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

INSERT INTO userAccounts (username, email, password, firstname, lastname) VALUES
('user1', 'user1@example.com', 'hashed_password_1', 'John', 'Doe'),
('user2', 'user2@example.com', 'hashed_password_2', 'Alice', 'Smith'),
('user3', 'user3@example.com', 'hashed_password_3', 'Bob', 'Johnson'),
('user4', 'user4@example.com', 'hashed_password_4', 'Emma', 'Williams'),
('user5', 'user5@example.com', 'hashed_password_5', 'Michael', 'Brown');