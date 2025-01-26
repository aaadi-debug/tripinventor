const express = require("express");
const router = express.Router();
const About = require("../models/About");

// Route to fetch About Us data
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About Us data not found." });
    }
    res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    res.status(500).json({ message: "Failed to fetch About Us data." });
  }
});

// Route to update About Us data
router.put("/", async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Create new data if none exists
    });
    res.status(200).json(updatedAbout);
  } catch (error) {
    console.error("Error updating About Us data:", error);
    res.status(500).json({ message: "Failed to update About Us data." });
  }
});

module.exports = router;
