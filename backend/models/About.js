const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  about: {
    title: String,
    heading: String,
    description: String,
    milestones: [String],
    images: [String],
    bigImage: String,
  },
  missionVision: {
    mission: String,
    vision: String,
    images: {
      mission: String,
      vision: String,
    },
  },
  values: [
    {
      title: String,
      description: String,
      icon: String,
    },
  ],
});

module.exports = mongoose.model("About", AboutSchema);
