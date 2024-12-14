const express = require("express");
const Query = require("../models/Query");
const router = express.Router();

// Submit Query form
router.post("/queries", async (req, res) => {
    try {
        console.log(req.body);
        const { name, phone, checkin, guests, message } = req.body;
        
        console.log(name);
        console.log(phone);
        console.log(checkin);
        console.log(guests);
        console.log(message);
        // Validate input
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!phone) {
            return res.status(400).json({ message: "Phone is required" });
        }

        // Save query to MongoDB
        const newQuery = new Query({ name, phone, checkin, guests, message });
        await newQuery.save();

        res.status(201).json({ message: "Query saved successfully!" });
    } catch (err) {
        console.error("Error saving query:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all queries
router.get("/queries", async (req, res) => {
    try {
        const queries = await Query.find(); // Retrieve all queries from MongoDB
        res.status(200).json(queries);
    } catch (err) {
        console.error("Error fetching quries:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single quuery by ID
router.get("/queries/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const query = await Query.findById(id); // Retrieve a query by its ID
        if (!query) {
            return res.status(404).json({ message: "Query not found" });
        }

        res.status(200).json(query);
    } catch (err) {
        console.error("Error fetching query:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a query by ID
router.delete("/queries/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the query exists
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: "Query not found" });
        }

        // Delete the query
        await Query.findByIdAndDelete(id);
        res.status(200).json({ message: "Query deleted successfully!" });
    } catch (err) {
        console.error("Error deleting query:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
