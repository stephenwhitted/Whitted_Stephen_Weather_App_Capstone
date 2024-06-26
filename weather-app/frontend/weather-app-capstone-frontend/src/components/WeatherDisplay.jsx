import React from 'react';

const WeatherDisplay = ({ weather, forecast }) => {
  // Ensure weather is an array
  const weatherArray = Array.isArray(weather) ? weather : [weather];

  return (
    <div className="weather-display">
      <h2>Current Weather</h2>
      {weatherArray.map((item, index) => (
        <div key={index}>
          <p>City: {item.name}</p>
          <p>Temperature: {item.main.temp}°C</p>
          <p>Weather: {item.weather[0].description}</p>
        </div>
      ))}

      <h2>Forecast</h2>
      {forecast && forecast.map((item, index) => (
        <div key={index}>
          <p>Date: {new Date(item.dt_txt).toLocaleString()}</p>
          <p>Temperature: {item.main.temp}°C</p>
          <p>Weather: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;
