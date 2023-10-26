const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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
  tags: {
    type: [Object],
    required: false,
  }
});

const questionModel = mongoose.model("questionmodels", questionSchema);

module.exports = questionModel;
