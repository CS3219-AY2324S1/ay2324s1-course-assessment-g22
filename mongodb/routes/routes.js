const express = require("express");
const questionModels = require("../config/dbModels.js");
const app = express();

const urlPrefix = "/api/questions";

app.post(`${urlPrefix}`, async (req, res) => {
  const qn = new questionModels(req.body);

  try {
    await qn.save();
    res.send(qn);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get(`${urlPrefix}`, async (req, res) => {
  const qn = await questionModels.find({});

  try {
    res.send(qn);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
