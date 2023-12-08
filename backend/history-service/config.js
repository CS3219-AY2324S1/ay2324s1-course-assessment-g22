require("dotenv").config();

module.exports = {
  database: {
    user: process.env.POSTGRES_USERNAME || "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.DATABASE || "history-service",
    password: process.env.PASSWORD || "postgres",
    port: process.env.PORT || 5432,
  },
  jwtSecret: process.env.POSTGRES_JWT_SECRET || "jwt-secret",
  services: {
    frontend: {
      URL: process.env.FRONTEND_SERVICE_URL || "http://localhost:3000",
    }, matching: {
      URL: process.env.MATCHING_SERVICE_URL || "http://localhost:5000",
    }, collab: {
      URL: process.env.COLLAB_SERVICE_URL || "http://localhost:5001",
    }
  },
};