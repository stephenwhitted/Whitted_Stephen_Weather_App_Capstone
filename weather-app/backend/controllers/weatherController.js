const axios = require('axios');

const getWeatherByCity = async (req, res) => {
    const city = req.query.city;
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  };