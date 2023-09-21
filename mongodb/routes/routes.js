const express = require("express");
const questionModel = require("../config/dbModels.js");
const app = express();

const urlPrefix = "/api/questions";
const questionTitle = "title";
const fieldsRequred = ["title", "category", "complexity", "description"];

// Create and save questions
app.post(`${urlPrefix}`, async (req, res) => {
  // Check if any fields are not in the HTTP request
  if (!fieldsRequred.every((field) => field in req.body)) {
    res.status(400).json({ error: "Some necessary field(s) are not present!" });
    return;
  }

  const qn = new questionModel(req.body);

  // Check if question title is already in mongodb
  let hasTitle = questionModel.exists({ title: `/${qn.title}/i` });
  if (hasTitle) {
    res.status(400).json({ error: "Title already exists!" });
    return;
  }

  await qn
    .save()
    .then((qn) => {
      res.send(qn); // Double check successful adding
    })
    .catch((err) => res.status(500).send(err));
});

// Get all questions
app.get(`${urlPrefix}`, async (req, res) => {
  await questionModel
    .find({})
    .then((qns) => res.send(qns))
    .catch((err) => res.status(500).send(err));
});

// Update question into database
app.put(`${urlPrefix}/${questionTitle}`, async (req, res) => {
  const filter = { title: `${questionTitle}` };
  const update = req.body;
  // {
  //   $set: {
  //     title: `${questionTitle}`,
  //     category: req.body.category,
  //     complexity: req.body.complexity,
  //     description: req.body.description,
  //   },
  // };
  await questionModel
    .findOneAndUpdate(filter, update)
    .then((qn) => {
      qn
        ? res.status(404).send("No such question!")
        : res.status(200).send("Question updated successfully.");
    })
    .catch((err) => res.status(500).send(err));
});

// Delete question in database
app.delete(`${urlPrefix}/${questionTitle}`, async (req, res) => {
  const filter = { title: `${questionTitle}` };
  await questionModel
    .deleteOne(filter)
    .then(() => res.status(200).send("Question deleted successfully"))
    .catch((err) => res.status(500).send(err));
});

module.exports = app;
