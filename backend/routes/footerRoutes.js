const express = require("express");
const router = express.Router();
const Footer = require("../models/Footer");

// Route to fetch footer data
router.get("/", async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "Footer data not found." });
    }
    res.status(200).json(footer);
  } catch (error) {
    console.error("Error fetching footer data:", error);
    res.status(500).json({ message: "Failed to fetch footer data." });
  }
});

// Route to update footer data
router.put("/", async (req, res) => {
  try {
    const updatedFooter = await Footer.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Create a new document if none exists
    });
    res.status(200).json(updatedFooter);
  } catch (error) {
    console.error("Error updating footer data:", error);
    res.status(500).json({ message: "Failed to update footer data." });
  }
});

module.exports = router;
