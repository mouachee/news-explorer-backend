const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./user");

const newsArticleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Invalid URL format",
    },
  },
  title: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Invalid image URL format",
    },
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("article", newsArticleSchema);
