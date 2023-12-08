require("dotenv").config();

module.exports = {
  jwtSecret: process.env.POSTGRES_JWT_SECRET || "jwt-secret",
  services: {
    frontend: {
      URL: process.env.FRONTEND_SERVICE_URL || "http://localhost:3000",
    }, history: {
      URL: process.env.HISTORY_SERVICE_URL || "http://localhost:5003"
    }, redis: {
      host: process.env.REDIS_HOST || "localhost"
    }
  },
};
