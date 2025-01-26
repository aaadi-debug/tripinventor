const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// POST route to handle form submissions
router.post('/submit', async (req, res) => {
    try {
        const {
            destinations,
            checkIn,
            checkOut,
            // nights,
            adults,
            children,
            childAge,
            hotelCategory,
            budget,
            mealPlan,
            additionalRequirements,
            name,
            email,
            phone,
        } = req.body;

        // Validation to ensure all required fields are present
        if (!destinations || !checkIn || !checkOut || !adults || !hotelCategory || !budget || !mealPlan || !name || !email || !phone) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        // Create a new enquiry document
        const newEnquiry = new Enquiry({
            destinations,
            checkIn,
            checkOut,
            // nights,
            adults,
            children,
            childAge,
            hotelCategory,
            budget,
            mealPlan,
            additionalRequirements,
            name,
            email,
            phone,
        });

        // Save the enquiry to the database
        await newEnquiry.save();

        res.status(201).json({ message: 'Enquiry submitted successfully!' });
    } catch (error) {
        console.error('Error submitting enquiry:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// GET route to retrieve all enquiries (optional, for admin)
router.get('/list', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const enquiryId = req.params.id; // Ensure you are capturing the ID from the route
        const deletedEnquiry = await Enquiry.findByIdAndDelete(enquiryId);

        if (!deletedEnquiry) {
            return res.status(404).json({ message: "Enquiry not found." });
        }

        res.json({ message: "Enquiry deleted successfully." });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = router;
