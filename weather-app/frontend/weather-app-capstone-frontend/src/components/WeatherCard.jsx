import React from 'react';

const WeatherCard = ({ title, value }) => (
  <div className="weather-card">
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default WeatherCard;
