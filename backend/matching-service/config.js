require("dotenv").config();

module.exports = {
  database: {
    user: process.env.POSTGRES_USERNAME || "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.DATABASE || "matching-service",
    password: process.env.PASSWORD || "postgres",
    port: process.env.PORT || 5432,
  },
  jwtSecret: process.env.POSTGRES_JWT_SECRET || "jwt-secret",
  services: {
    frontend: {
      URL: process.env.FRONTEND_SERVICE_URL || "http://localhost:3000",
    },
    question: {
      URL: process.env.QUESTION_SERVICE_URL || "http://localhost:4567",
    },
    rabbitmq: {
      URL: process.env.RABBITMQ_URL || "amqp://localhost",
    }, history: {
      URL: process.env.HISTORY_SERVICE_URL || "http://localhost:5003",
    }
  },
};
