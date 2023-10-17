INSERT INTO userAccounts (username, email, password, firstname, lastname) VALUES
('user1', 'user1@example.com', 'hashed_password_1', 'John', 'Doe'),
('user2', 'user2@example.com', 'hashed_password_2', 'Alice', 'Smith'),
('user3', 'user3@example.com', 'hashed_password_3', 'Bob', 'Johnson'),
('user4', 'user4@example.com', 'hashed_password_4', 'Emma', 'Williams'),
('user5', 'user5@example.com', 'hashed_password_5', 'Michael', 'Brown');

INSERT INTO userAccounts (username, email, password, firstname, lastname, role) VALUES
('maintainer', 'maintainer1@example.com', 'hashed_password_1', 'Joe', 'The Maintainer', 'maintainer'),
('m', 'maintainer2@example.com', 'm', 'Steve', 'The Maintainer', 'maintainer'),
('admin', 'maintainer3@example.com', 'a', 'Martin', 'The Maintainer', 'maintainer');
