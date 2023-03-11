import React, { useState } from "react";
import "./weather.css";

function Weather() {
  const [weatherData, setWeatherdata] = useState(null);
  const [city, setCity] = useState("");
  const API_KEY = "d7c26a493c471758246f5c49340718c5";
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) {
      setWeatherdata(null);
      return;
    }
    const data = await response.json();
    setWeatherdata(data);
    console.log("value", weatherData);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const forecast = weatherData
    ? weatherData.list
        .filter((item, index) => index % 8 === 0)
        .slice(0, 5)
        .map((item) => {
          const date = new Date(item.dt * 1000);
          const day = days[date.getDay()];
          const temperature = Math.round(((item.main - 273) * 9) / 5 + 32);
          const description = item.weather[0].description;
          return { date, day, temperature, description };
        })
    : [];
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search-container"
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleCityChange}
        />
        <button className="search-button" type="submit">
          Search city
        </button>
      </form>
      {weatherData === null ? (
        <p>No data available</p>
      ) : weatherData ? (
        (weatherData.cod = "200" ? (
          <>
            {"Here is next 5 days weathers of"}
            <b>{weatherData.city.name}</b>
            <div className="card-container">
              {forecast.map((item) => (
                <div className="card" key={item.date}>
                  {" "}
                  <h3>
                    <u>{item.day}</u>
                  </h3>
                  <p>{item.date.toLocaleDateString()}</p>
                  <p>Temperature: {item.temperature}</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No data available</p>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Weather;
