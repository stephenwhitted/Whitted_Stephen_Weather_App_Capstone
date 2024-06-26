import React, { useState } from 'react';

const WeatherForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleCityStateSubmit = async (e) => {
    e.preventDefault();
    const query = `q=${city},${state}`;
    fetchWeather(query);
  };

  const handleLatLonSubmit = async (e) => {
    e.preventDefault();
    const query = `lat=${latitude}&lon=${longitude}`;
    fetchWeather(query);
  };

  return (
    <div>
      <form onSubmit={handleCityStateSubmit}>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Weather by City and State</button>
      </form>

      <form onSubmit={handleLatLonSubmit}>
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Weather by Latitude and Longitude</button>
      </form>
    </div>
  );
};

export default WeatherForm;
