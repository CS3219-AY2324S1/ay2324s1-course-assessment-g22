const express = require("express");
const questionModel = require("../config/dbModels.js");
const app = express();

const urlPrefix = "/api/questions";
const fieldsRequred = ["title", "category", "complexity", "description"];

// Create and save questions
app.post(`${urlPrefix}`, async (req, res) => {
  // Check if any fields are not in the HTTP request
  if (!fieldsRequred.every((field) => field in req.body)) {
    res
      .status(400)
      .json({ message: "Some necessary field(s) are not present!" });
    return;
  }

  try {
    const existingQn = await questionModel.findOne({
      title: { $regex: new RegExp(req.body.title, "i") },
    });

    if (existingQn) {
      res
        .status(409)
        .json({ message: "Question with the same title already exists" });
    } else {
      const qn = new questionModel(req.body);
      await qn.save();
      res.status(200).json({ message: "Question added successfully", qn });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error });
  }
});

// Get all questions
app.get(`${urlPrefix}`, async (req, res) => {
  await questionModel
    .find({})
    .then((qns) => res.json({ questions: qns }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Update question into database
app.put(`${urlPrefix}/:questionTitle`, async (req, res) => {
  if (req.params.questionTitle.toLowerCase() !== req.body.title.toLowerCase()) {
    res.status(400).json({ message: "URL does not match title field!" });
    return;
  }

  const newQuestion = req.body;
  const questionTitle = newQuestion.title;

  try {
    const questionToUpdate = await questionModel.findOne({
      title: { $regex: new RegExp(questionTitle, "i") },
    });

    if (!questionToUpdate) {
      res.status(404).json({ message: "No such question found" });
      return;
    }

    questionToUpdate.title = newQuestion.title;
    questionToUpdate.category = newQuestion.category;
    questionToUpdate.complexity = newQuestion.complexity;
    questionToUpdate.description = newQuestion.description;

    await questionToUpdate.save();

    res.status(200).json({
      message: "Question updated successfully",
      updatedQuestion: questionToUpdate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error });
  }
});

// Delete question in database
app.delete(`${urlPrefix}/:questionTitle`, async (req, res) => {
  const questionTitle = req.params.questionTitle;

  try {
    const questionToDelete = await questionModel.findOne({
      title: { $regex: questionTitle, $options: "i" },
    });

    if (!questionToDelete) {
      res.status(404).json({ message: "No such question found" });
      return;
    }
    await questionToDelete.deleteOne();

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
});

module.exports = app;