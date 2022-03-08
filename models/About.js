const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: JSON,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("About", AboutSchema);
