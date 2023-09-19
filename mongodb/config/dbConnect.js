import { username, password, clusterName, databaseName } from "./dbAdmin";

const mongoose = require("mongoose");
const express = require("express");
const Router = require("./routes");

const LISTEN_PORT_NUMBER = 3000;

const app = express();
app.use(express.json());

// Initial connection to database
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${clusterName}.rwipe4m.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

// Error handling after connection is established
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection failed: "));
db.once("open", () => console.log("Connected successfully to MongoDB"));

app.use(Router);
app.listen(LISTEN_PORT_NUMBER, () => {
  console.log("Connected to port 3000");
});
