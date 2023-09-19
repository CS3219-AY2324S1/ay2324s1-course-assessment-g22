const express = require("express");
const questionModels = require("../config/dbModels.js");
const app = express();

app.post("/add_qn", async (req, res) => {
  const qn = new questionModels(req.body);

  try {
    await qn.save();
    res.send(qn);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/get_qn", async (req, res) => {
  const qn = await questionModels.find({});

  try {
    res.send(qn);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
