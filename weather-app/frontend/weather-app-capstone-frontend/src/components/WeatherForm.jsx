import React, { useState } from 'react';

const WeatherForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging statement
    const query = city && state
      ? `q=${city},${state}`
      : `lat=${latitude}&lon=${longitude}`;
    console.log("Query:", query); // Debugging statement
    fetchWeather(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Get Weather by City and State</h2>
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
      <h2>Or Get Weather by Latitude and Longitude</h2>
      <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
