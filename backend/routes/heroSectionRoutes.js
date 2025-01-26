const express = require('express');
const HeroSection = require('../models/HeroSection');
const router = express.Router();

// GET all banners
router.get('/', async (req, res) => {
  try {
    const banners = await HeroSection.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

// POST a new banner
router.post('/', async (req, res) => {
  const { image, title, subtitle, link } = req.body;

  try {
    const newBanner = new HeroSection({ image, title, subtitle, link });
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add banner' });
  }
});

// PUT (update) a banner by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBanner = await HeroSection.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBanner);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update banner' });
  }
});

// DELETE a banner by ID
router.delete('/:id', async (req, res) => {
  try {
    await HeroSection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete banner' });
  }
});

module.exports = router;
