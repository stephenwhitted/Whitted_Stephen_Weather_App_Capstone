const express = require('express');
const { getWeatherByCity, getWeatherByCoordinates } = require('../controllers/weatherController');
const router = express.Router();

router.get('/city', getWeatherByCity);
router.get('/coordinates', getWeatherByCoordinates);

// test route to ensure backend server is working
router.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

module.exports = router;
