const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// Fetch a specific destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch destinations with dynamic filtering or by title
router.get("/", async (req, res) => {
  try {
    const { title, themeTours, wellnessSpa, beachTheme, wildlifeTheme, cultureTheme, trainsTheme, trekkingTheme,spiritualTheme,festivalTheme, wonderTheme, unescoTheme, domesticTours, internationalTours, domesticCategory, internationalCategory, location, price } = req.query;

    // If `title` is provided, fetch a single destination by title
    if (title) {
      const destination = await Destination.findOne({ title: { $regex: title, $options: "i" } });
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      return res.status(200).json(destination); // Return the specific destination
    }

    // Build a dynamic query for filtering
    const query = {};
    if (themeTours === "yes") query.themeTours = "yes";
    if (wellnessSpa === "yes") query.wellnessSpa = "yes";
    if (beachTheme === "yes") query.beachTheme = "yes";
    if (wildlifeTheme === "yes") query.wildlifeTheme = "yes";
    if (cultureTheme === "yes") query.cultureTheme = "yes";
    if (trainsTheme === "yes") query.trainsTheme = "yes";
    if (trekkingTheme === "yes") query.trekkingTheme = "yes";
    if (spiritualTheme === "yes") query.spiritualTheme = "yes";
    if (festivalTheme === "yes") query.festivalTheme = "yes";
    if (wonderTheme === "yes") query.wonderTheme = "yes";
    if (unescoTheme === "yes") query.unescoTheme = "yes";

    if (domesticTours === "yes") query.domesticTours = "yes";
    if (internationalTours === "yes") query.internationalTours = "yes";
    if (location) query.location = { $regex: location, $options: "i" }; // Case-insensitive location search
    if (price) query.price = { $lte: parseInt(price) }; // Price less than or equal to the specified value
    if (domesticCategory) query.domesticCategory = { $regex: domesticCategory, $options: "i" }; // Domestic category filter
    if (internationalCategory) query.internationalCategory = { $regex: internationalCategory, $options: "i" }; // International category filter

    // Fetch filtered destinations

    // Fetch filtered destinations
    const destinations = await Destination.find(query);

    if (destinations.length === 0) {
      return res.status(404).json({ message: "No destinations found" });
    }

    res.status(200).json(destinations); // Return the filtered destinations
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});


// Add a new destination
router.post("/", async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a destination
router.put("/:id", async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(updatedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a destination
router.delete("/:id", async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/itinerary", (req, res) => {
  try {
    const { itinerary } = req.body;

    if (!Array.isArray(itinerary)) {
      return res.status(400).json({ error: "Itinerary must be an array" });
    }

    // Validate itinerary structure
    const isValid = itinerary.every(day =>
      day.day && day.title && Array.isArray(day.content)
    );

    if (!isValid) {
      return res.status(400).json({ error: "Invalid itinerary format" });
    }

    res.status(200).json({ message: "Itinerary processed successfully", data: itinerary });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing the itinerary" });
  }
});


module.exports = router;
