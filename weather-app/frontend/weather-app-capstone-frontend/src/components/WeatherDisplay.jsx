import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherDisplay = ({ weather, forecast }) => (
  <div className="weather-display">
    <h3>Current Weather</h3>
    <WeatherCard title="Temperature" value={`${weather.main.temp}°K`} />
    <WeatherCard title="Humidity" value={`${weather.main.humidity}%`} />
    <WeatherCard title="Conditions" value={weather.weather[0].description} />
    <h3>3-Hour Forecast</h3>
    <div className="forecast">
      {forecast.map((f, index) => (
        <WeatherCard key={index} title={new Date(f.dt * 1000).toLocaleTimeString()} value={`${f.main.temp}°K, ${f.weather[0].description}`} />
      ))}
    </div>
  </div>
);

export default WeatherDisplay;
