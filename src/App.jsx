import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const api = {
    key: "caa8fbcf4a9fba77b8f1efea1c03dae9",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((data) => {
            setWeather(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      },
      (error) => {
        console.error('Error getting user location:', error);
        setLoading(false);
      }
    );
  }, []);

  function searchPress() {
    setLoading(true);
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  return (
    <article>
      <div className='weather'>
        <center>
          <h1>Weather App</h1>
        </center>
        <input type='text' onChange={(e) => setSearch(e.target.value)} />
        <button onClick={searchPress}>Search</button>
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : typeof weather.main !== 'undefined' ? (
            <div className='cards'>
              <p>Name: {weather.name}</p>
              <p>Temp: {weather.main.temp}<sup>0</sup>C</p>
              <p>Cloud/Rain: {weather.weather[0].main}</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          ) : (
            <div className='not-found'>Not Found</div>
          )}
        </section>
      </div>
    </article>
  );
};

export default App;
