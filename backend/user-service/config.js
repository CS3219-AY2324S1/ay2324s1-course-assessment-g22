require('dotenv').config();

module.exports = {
    database: {
      user: process.env.POSTGRES_USERNAME || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: process.env.DATABASE || 'user-service',
      password: process.env.PASSWORD || 'postgres',
      port: process.env.PORT || 5432, 
    },
    jwtSecret: process.env.POSTGRES_JWT_SECRET || "jwt-secret",
  };