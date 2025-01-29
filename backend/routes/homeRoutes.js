// routes/homeRoutes.js
const express = require("express");
const router = express.Router();
const Home = require("../models/Home");

// Get Homepage Data
router.get("/", async (req, res) => {
    try {
        const homeData = await Home.findOne();
        res.json(homeData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Homepage Data
router.put("/", async (req, res) => {
    try {
        const updatedData = await Home.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
