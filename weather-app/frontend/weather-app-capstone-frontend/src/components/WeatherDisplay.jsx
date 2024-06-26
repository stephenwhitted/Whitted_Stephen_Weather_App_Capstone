// /weather-app/frontend/src/components/WeatherDisplay.jsx
import React from 'react';

const WeatherDisplay = ({ weather }) => (
  <div className="weather-display">
    {weather.map((entry) => (
      <div key={entry.uniqueWeatherId} className="weather-card">
        <h2>{entry.city}, {entry.state}</h2>
        <p>Unique ID: {entry.uniqueWeatherId}</p>
        <p>Timestamp: {new Date(entry.timestamp).toLocaleString()}</p>
      </div>
    ))}
  </div>
);

export default WeatherDisplay;
