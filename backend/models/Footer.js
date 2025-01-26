// models/Footer.js
const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  columns: [
    {
      heading: String,
      links: [
        {
          name: String,
          url: String,
        },
      ],
    },
  ],
  newsletter: {
    heading: String,
    description: String,
  },
  socialMedia: [
    {
      platform: String,
      url: String,
      icon: String,
    },
  ],
});

module.exports = mongoose.model("Footer", FooterSchema);
