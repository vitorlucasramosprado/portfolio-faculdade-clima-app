import React, { useState, useEffect } from "react";
import "./App.css";
import backgroundSummer from './background-summer.jpg';
import backgroundWinter from './background-winter.jpg';

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [bgImage, setBgImage] = useState(backgroundSummer);

  const fetchData = async () => {
    if (query !== "") {
      const response = await fetch(
        `${api.base}weather?q=${query}&lang=pt_br&units=metric&APPID=${api.key}`
      );
      const data = await response.json();

      if (data.main) {
        setWeather(data);

        if (data.main.temp > 15) {
          setBgImage(backgroundSummer);
        } else {
          setBgImage(backgroundWinter);
        }
      } else {
        setWeather({});
        setBgImage("");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bgImage})` }}>
      <main>
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search-bar"
              placeholder="Digite o nome da cidade..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button type="submit" className="search-button">
              Pesquisar
            </button>
          </form>
        </div>
        {weather.main ? (
          <div className="weather">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <div className="weather-description">
              {weather.weather[0].description}
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
