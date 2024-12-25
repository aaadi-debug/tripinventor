const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  destinationTitle: { type: String, required: true }, // Add this field
});

module.exports = mongoose.model("Review", ReviewSchema);
