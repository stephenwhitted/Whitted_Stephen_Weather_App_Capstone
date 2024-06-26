// /weather-app/backend/routes/weather.js
const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

// Create a weather entry
router.post('/', async (req, res) => {
  const { city, state, uniqueWeatherId } = req.body;
  try {
    const entry = new Weather({ city, state, uniqueWeatherId });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating weather entry');
  }
});

// Read all weather entries
router.get('/', async (req, res) => {
  try {
    const entries = await Weather.find();
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather entries');
  }
});

// Read a specific weather entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await Weather.findById(req.params.id);
    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather entry');
  }
});

// Update a weather entry
router.put('/:id', async (req, res) => {
  const { city, state, uniqueWeatherId } = req.body;
  try {
    const entry = await Weather.findByIdAndUpdate(req.params.id, { city, state, uniqueWeatherId }, { new: true });
    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating weather entry');
  }
});

// Delete a weather entry
router.delete('/:id', async (req, res) => {
  try {
    await Weather.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting weather entry');
  }
});

module.exports = router;
