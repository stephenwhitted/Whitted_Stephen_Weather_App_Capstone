const express = require('express');
const http = require('http');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;  // Port definition for backend

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a Weather schema and model
const weatherSchema = new mongoose.Schema({
  city: String,
  state: String,
  uniqueWeatherId: String,
  timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

// Routes
app.use('/api/weather', require('./routes/weather'));

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Weather App API');
});

// Add a route to fetch current weather data from OpenWeatherMap API
app.get('/api/weather/current', async (req, res) => {
  const { query } = req.query;
  try {
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${process.env.OPENWEATHER_API_KEY}`);
    res.json(weatherResponse.data);
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    res.status(500).send('Error fetching current weather data');
  }
});

// Add a route to fetch weather forecast data from OpenWeatherMap API
app.get('/api/weather/forecast', async (req, res) => {
  const { query } = req.query;
  try {
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${process.env.OPENWEATHER_API_KEY}`);
    res.json(forecastResponse.data);
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    res.status(500).send('Error fetching weather forecast data');
  }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Server listen statement
