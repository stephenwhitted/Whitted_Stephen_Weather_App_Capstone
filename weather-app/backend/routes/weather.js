const express = require('express');
const { getWeatherByCity, getWeatherByCoordinates } = require('../controllers/weatherController');
const router = express.Router();

router.get('/city', getWeatherByCity);
router.get('/coordinates', getWeatherByCoordinates);

module.exports = router;
