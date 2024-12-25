const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  checkin: { type: Date, required: true },
  guests: { type: Number, required: true },
  message: { type: String },
});

module.exports = mongoose.model("Query", QuerySchema);
