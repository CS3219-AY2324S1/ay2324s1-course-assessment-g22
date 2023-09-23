const mongoose = require("mongoose");
const express = require("express");
const router = require("../routes/routes");
const dbAdmin = require("./dbAdmin");
const cors = require("cors");

const LISTEN_PORT_NUMBER = 4567;
const username = dbAdmin.username;
const password = dbAdmin.password;
const clusterName = dbAdmin.clusterName;
const databaseName = dbAdmin.databaseName;

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "POST, GET, PUT, DELETE",
};
app.use(cors(corsOptions)); // Use the cors middleware

// Initial connection to database
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${clusterName}.rwipe4m.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  )
  .catch((error) => {
    console.log("Cannot connect to database: ", error);
    process.exit();
  });

// Error handling after connection is established
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection failed: "));
db.once("open", () => console.log("Connected successfully to MongoDB"));

app.use(router);
app.listen(LISTEN_PORT_NUMBER, () => {
  console.log(`Connected to port ${LISTEN_PORT_NUMBER}`);
});
