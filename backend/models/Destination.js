const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  discount: { type: String },
  duration: { type: String },
  price: { type: String },
  images: [{ type: String }],
  pickupLocation: { type: String },
  languages: [{ type: String }],
  descriptions: [{ type: String }],
  additionalInfo: {
    includes: [{ type: String }],
    excludes: [{ type: String }],
  },
  itinerary: [
    {
      // id: { type: Number },
      day: { type: String },
      title: { type: String },
      content: [{ type: String }],
    },
  ],
  reviews: [
    {
      name: { type: String },
      date: { type: String },
      rating: { type: Number },
      src: { type: String },
      title: { type: String },
      content: { type: String },
    },
  ],
});

module.exports = mongoose.model("Destination", DestinationSchema);
