const mongoose = require('mongoose');

const HeroSectionSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL of the image
  title: { type: String, required: true }, // Main heading
  subtitle: { type: String, required: true }, // Subheading
  link: { type: String, required: true },   // Link for the button
}, { timestamps: true });

module.exports = mongoose.model('HeroSection', HeroSectionSchema);
