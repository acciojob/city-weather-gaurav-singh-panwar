import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    weatherInfo();
  }, [cityName]);

  const weatherInfo = () => {
    if (cityName) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7c6752fa195f26616f7223b785694963`
      )
        .then((response) => {
          response.json().then((data) => {
            if (data.cod && data.cod !== "404") {
              setWeather(data);
              setCityName("");
            }

            console.log(weather);
          });
        })
        .catch((err) => console.error(err));
    }
  };

  console.log(cityName);
  return (
    <div>
      {/* Do not remove the main div */}
      <input
        className="search"
        type="text"
        onChange={(e) => {
          setCityName(e.target.value);
        }}
        placeholder="Enter a city"
        value={cityName}
      />
      {weather ? (
        <div className="weather">
          <div className="name">{weather.name}</div>
          {weather.main && (
            <div className="temp">{weather.main.temp} &deg;F</div>
          )}
          <div className="description">
            {weather.weather && weather.weather[0].description}
          </div>
          <div className="icon">
            {weather.weather && (
              <img
                src={
                  "http://openweathermap.org/img/w/" +
                  weather.weather[0].icon +
                  ".png"
                }
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;