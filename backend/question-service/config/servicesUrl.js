module.exports = {
  services: {
    frontend: {
      URL: process.env.FRONTEND_SERVICE_URL || "http://localhost:3000",
    },
    matching: {
      URL: process.env.MATCHING_SERVICE_URL || "http://localhost:5000",
    },
  },
};
