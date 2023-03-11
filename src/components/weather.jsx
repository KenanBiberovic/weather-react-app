import React, { useState } from "react";
import "./weather.css";

function Weather() {
  const [weatherData, setWeatherdata] = useState(null);
  const [city, setCity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=$d7c26a493c471758246f5c49340718c5`
    );
    const data = await response.json();
    setWeatherdata(data);
    console.log("value", weatherData);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
    console.log("entered city name", event.target.value);
  };
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
    </div>
  );
}

export default Weather;
