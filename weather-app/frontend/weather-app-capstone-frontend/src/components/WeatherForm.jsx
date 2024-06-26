// /weather-app/frontend/src/components/WeatherForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const WeatherForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [uniqueWeatherId, setUniqueWeatherId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/weather', { city, state, uniqueWeatherId });
      fetchWeather();
    } catch (error) {
      console.error('Error creating weather entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
      />
      <input
        type="text"
        value={uniqueWeatherId}
        onChange={(e) => setUniqueWeatherId(e.target.value)}
        placeholder="Unique Weather ID"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
