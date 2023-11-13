[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Setup for Peerprep

- Add dbAdmin.js in ~/backend/question-service/config

```
const username = "REDACTED";
const password = "REDACTED";
const clusterName = "REDACTED";
const databaseName = "REDACTED";
const jwtSecret = "any 256 bit secret";

module.exports = {
  username,
  password,
  clusterName,
  databaseName,
  jwtSecret,
};
```

- Add .env files in `/backend/user-service`, `backend/matching-service`, `backend/collab-service`, `backend/history-service`, `backend/chat-service`
- The content of the .env files are the same, which is the jwtSecret used in dbAdmin.js above

```
POSTGRES_JWT_SECRET=puturownjwtsecrethere
```

# Instructions on testing Peerprep

- Launch Docker (Recommended: Docker Desktop)
- Run `docker compose up --build` in the main directory to build and start up the containers. When the frontend container is up and running, access `localhost:3000` in the browser to test the app.
- If you wish to run the containers in the background, run `docker compose up --build -d` instead
- To stop the containers, run `docker compose stop` or press `CTRL + C`
- To stop and remove the containers, run `docker compose down`

# Cloud Deployment

- Access http://34.142.208.22:3000/ to view.
