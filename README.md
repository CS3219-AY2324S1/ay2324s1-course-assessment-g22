[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Setup for Assignment 3

#### Use npm install on the following directories

- ~/backend
- ~/frontend
- ~/mongodb

#### Postgres DB

- Download pgAdmin with postgres15.
- Create new DB using pgAdmin
- Add config.js to ~/backend

```
module.exports = {
  database: {
    user: 'your-db-user',
    host: 'your-db-host',
    database: 'your-db-name',
    password: 'your-db-password',
    port: 5432, // Change to your database port
  },
  jwtSecret: "Replace with any 256 bit secret",
};
```

- Use files in sqlFiles to create table and insert default values
- If previously testing assignment 2, drop the table and recreate with new schema

#### MongoDB

- Add dbAdmin.js in ~/mongodb/config

```
const username = "REDACTED";
const password = "REDACTED";
const clusterName = "REDACTED";
const databaseName = "REDACTED";
const jwtSecret = "Same secret as the one used above";

module.exports = {
  username,
  password,
  clusterName,
  databaseName,
  jwtSecret,
};
```

### Test App

- cd frontend
- npm start

# Setup for Assignment 2

#### Use npm install on the following directories

- ~/backend
- ~/frontend
- ~/mongodb

#### Postgres DB

- Download pgAdmin with postgres15.
- Create new DB using pgAdmin
- Add config.js to ~/backend

```
module.exports = {
  database: {
    user: 'your-db-user',
    host: 'your-db-host',
    database: 'your-db-name',
    password: 'your-db-password',
    port: 5432, // Change to your database port
  },
};
```

- Use files in sqlFiles to create table and insert default values

#### MongoDB

- Add dbAdmin.js in ~/mongodb/config

```
const username = "REDACTED";
const password = "REDACTED";
const clusterName = "REDACTED";
const databaseName = "REDACTED";

module.exports = {
  username,
  password,
  clusterName,
  databaseName,
};
```

### Test App

- cd frontend
- npm start
