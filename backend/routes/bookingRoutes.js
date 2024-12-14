const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Submit booking form
router.post("/bookings", async (req, res) => {
    try {
        const { name, email, phone, date, noOfPeople, destinationTitle } = req.body;

        // Validate input
        if (!name || !email || !phone || !date || !noOfPeople || !destinationTitle) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save booking to MongoDBc
        const newBooking = new Booking({ name, email, phone, date, noOfPeople, destinationTitle });
        await newBooking.save();

        res.status(201).json({ message: "Booking saved successfully!" });
    } catch (err) {
        console.error("Error saving booking:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all bookings
router.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find(); // Retrieve all bookings from MongoDB
        res.status(200).json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single booking by ID
router.get("/bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id); // Retrieve a booking by its ID
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (err) {
        console.error("Error fetching booking:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a booking by ID
router.delete("/bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the booking exists
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Delete the booking
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (err) {
        console.error("Error deleting booking:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
