CREATE TABLE IF NOT EXISTS userAccounts (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    role VARCHAR(50) DEFAULT 'user' NOT NULL
);

INSERT INTO userAccounts (username, email, password, firstname, lastname) VALUES
('user1', 'user1@example.com', 'password_1', 'John', 'Doe'),
('user2', 'user2@example.com', 'password_2', 'Alice', 'Smith'),
('user3', 'user3@example.com', 'password_3', 'Bob', 'Johnson'),
('user4', 'user4@example.com', 'password_4', 'Emma', 'Williams'),
('user5', 'user5@example.com', 'password_5', 'Michael', 'Brown'),
('1', 'user6@example.com', '1', 'ShortUsername', 'Account'),
('2', 'user7@example.com', '2', 'ShortUsername2', 'Account2'),
('3', 'user8@example.com', '3', 'ShortUsername3', 'Account3');

INSERT INTO userAccounts (username, email, password, firstname, lastname, role) VALUES
('maintainer', 'maintainer1@example.com', 'hashed_password_1', 'Joe', 'The Maintainer', 'maintainer'),
('admin', 'maintainer2@example.com', 'a', 'Martin', 'The Maintainer', 'maintainer'),
('m', 'maintainer3@example.com', 'm', 'Steve', 'The Maintainer', 'maintainer'),
('m2', 'maintainer4@example.com', 'm2', 'ShortUsername', 'MaintainerAccount', 'maintainer'),
('m3', 'maintainer5@example.com', 'm3', 'ShortUsername', 'MaintainerAccount2', 'maintainer'),
('test', 'maintainer6@example.com', 'test', 'Tom', 'The Tester', 'maintainer'),
('abba', 'maintainer7@example.com', '123', 'abba', 'The Tester', 'maintainer');