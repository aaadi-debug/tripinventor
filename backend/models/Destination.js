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
  themeTours: { type: String, enum: ["yes", "no"], default: "no" },
  wellnessSpa: { type: String, enum: ["yes", "no"], default: "no" },
  beachTheme: { type: String, enum: ["yes", "no"], default: "no" },
  wildlifeTheme: { type: String, enum: ["yes", "no"], default: "no" },
  cultureTheme: { type: String, enum: ["yes", "no"], default: "no" },
  trainsTheme: { type: String, enum: ["yes", "no"], default: "no" },
  trekkingTheme: { type: String, enum: ["yes", "no"], default: "no" },
  spiritualTheme: { type: String, enum: ["yes", "no"], default: "no" },
  festivalTheme: { type: String, enum: ["yes", "no"], default: "no" },
  wonderTheme: { type: String, enum: ["yes", "no"], default: "no" },
  unescoTheme: { type: String, enum: ["yes", "no"], default: "no" },
  
  domesticTours: { type: String, enum: ["yes", "no"], default: "no" },
  domesticCategory: String, // Category selected from dropdown
  internationalTours: { type: String, enum: ["yes", "no"], default: "no" },
  internationalCategory: String, // Category selected from dropdown
});

module.exports = mongoose.model("Destination", DestinationSchema);
