const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  complexity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const questionModels = mongoose.model("questionModels", questionSchema);

module.exports = questionModels;
