const express = require("express");
const questionModel = require("../config/dbModels.js");
const app = express();
const jwt = require("jsonwebtoken");
const dbAdmin = require("../config/dbAdmin.js");

const urlPrefix = "/api/questions";
const fieldsRequired = ["title", "category", "complexity", "description"];

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: `Access denied. No token provided.` });
  }
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: `Access denied. Not Bearer Token.` });
  }
  const token = authHeader.substring(7, authHeader.length);
  try {
    const decoded = jwt.verify(token, dbAdmin.jwtSecret);
    const currentTimeInSeconds = Date.now();
    if (decoded.exp && currentTimeInSeconds > decoded.exp) {
      return res.status(401).json({ error: "Token has expired." });
    }
    req.user = decoded.username; // Store the decoded user information in the request object
    next(); // Move to the next middleware
  } catch (error) {
    temp = error;
    res.status(400).json({ error: `Invalid token.` });
  }
}

function verifyAdminToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: `Access denied. No token provided.` });
  }
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: `Access denied. Not Bearer Token.` });
  }
  const token = authHeader.substring(7, authHeader.length);
  try {
    const decoded = jwt.verify(token, dbAdmin.jwtSecret);
    const currentTimeInSeconds = Date.now();
    if (decoded.exp && currentTimeInSeconds > decoded.exp) {
      return res.status(401).json({ error: "Token has expired." });
    }
    req.user = decoded.username;
    if (decoded.role !== "maintainer") {
      return res
        .status(401)
        .json({ error: "Access denied. Not a maintainer (admin)." });
    }
    next(); // Move to the next middleware
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
}

// Create and save questions
app.post(`${urlPrefix}`, verifyAdminToken, async (req, res) => {
  // Check if any fields are not in the HTTP request
  try {
    if (!fieldsRequired.every((field) => field in req.body)) {
      res
        .status(400)
        .json({ message: "Some necessary field(s) are not present!" });
      return;
    }

    const existingQn = await questionModel.findOne({
      title: new RegExp(`^${req.body.title}$`, "i"),
    });

    if (existingQn) {
      res.status(409).json({
        message: "Question with the same title already exists",
      });
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
app.get(`${urlPrefix}`, verifyToken, async (req, res) => {
  await questionModel
    .find({})
    .then((qns) => res.json({ questions: qns }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Get all question categories
app.get(`${urlPrefix}/categories`, verifyToken, async (req, res) => {
  await questionModel
    .find({}, 'category')
    .then((qns) => res.json({ questions: qns }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Get all questions of a specific category and complexity
app.get(`${urlPrefix}/find`, async (req, res) => {
  const category_to_find = req.query.category;
  const complexity_to_find = req.query.complexity;

  await questionModel
    .find({$or: [{ category: new RegExp(category_to_find) }], complexity: complexity_to_find}, 'title')
    .then((qns) => res.json({ questions: qns }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Update question into database
app.put(`${urlPrefix}/:questionTitle`, verifyAdminToken, async (req, res) => {
  try {
    const questionToUpdate = await questionModel.findOne({
      title: new RegExp(`^${req.params.questionTitle}$`, "i"),
    });

    if (!questionToUpdate) {
      res.status(400).json({ message: "No such question found" });
      return;
    }

    const newQuestion = req.body;
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
app.delete(
  `${urlPrefix}/:questionTitle`,
  verifyAdminToken,
  async (req, res) => {
    const questionTitle = req.params.questionTitle;

    try {
      const questionToDelete = await questionModel.findOne({
        title: new RegExp(`^${questionTitle}$`, "i"),
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
  }
);

module.exports = app;
