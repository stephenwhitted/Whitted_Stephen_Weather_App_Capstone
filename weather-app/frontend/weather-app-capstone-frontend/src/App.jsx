import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';
import Error from './components/Error';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isDayTime, setIsDayTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [showMap, setShowMap] = useState(false);

  const fetchWeather = async (query) => {
    setLoading(true);
    setError('');
    console.log("Fetching weather for query:", query); // Debugging statement
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${import.meta.env.VITE_API_KEY}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${import.meta.env.VITE_API_KEY}`);
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list.slice(0, 8)); // Get the next 24 hours (3-hour intervals)
      setDayNightMode(weatherResponse.data.sys.sunrise, weatherResponse.data.sys.sunset);
      setWeatherCondition(weatherResponse.data.weather[0].main.toLowerCase());
      setShowMap(true); // Show the map after fetching weather
    } catch (err) {
      console.error('Failed to fetch weather data:', err); // Debugging statement
      setError('Failed to fetch weather data. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const setDayNightMode = (sunrise, sunset) => {
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Current Time:", currentTime); // Debugging statement
    console.log("Sunrise Time:", sunrise); // Debugging statement
    console.log("Sunset Time:", sunset); // Debugging statement
    setIsDayTime(currentTime >= sunrise && currentTime <= sunset);
  };

  useEffect(() => {
    if (weather) {
      setDayNightMode(weather.sys.sunrise, weather.sys.sunset);
    }
  }, [weather]);

  return (
    <div className={`App ${isDayTime ? 'day' : 'night'} ${weatherCondition} ${showMap ? 'show-svg' : ''}`}>
      <div className="svg-overlay">
        <img src="/us.svg" alt="US Map" />
      </div>
      <Header />
      <h1>Know Your Local Forecast</h1>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <div className="content-container">
        <div className="form-container">
          <WeatherForm fetchWeather={fetchWeather} />
        </div>
        {weather && <div className="map-container">
          <WeatherDisplay weather={weather} forecast={forecast} />
        </div>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
