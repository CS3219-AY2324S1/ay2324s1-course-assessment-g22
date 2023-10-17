### RabbitMQ Server (run before 'npm start')

1. Install Docker
2. Get RabbitMQ docker image from https://registry.hub.docker.com/_/rabbitmq/
3. docker run -d --name 3219 --network bridge -p 5672:5672 rabbitmq

### Matching Database (PostGreSQL)

1. Schema in /backend/Matching/matchingSchema.sql
2. Create Database for Matching
3. Place config.js in /backend/Matching (same format as the config.js for User Database)