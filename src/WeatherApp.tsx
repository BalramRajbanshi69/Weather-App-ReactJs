import { useState } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  const fetchWeather = async () => {
    try {
      if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
      }

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=c13600927304496db43174049241508&q=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      alert(
        "Error fetching weather data. Please check the city name or try again later."
      );
      setWeather(null);
    }
  };

  function handleClick() {
    fetchWeather();
  }
  return (
    <div className="weather-app">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>
      {weather && (
        <>
          <div className="weather-information">
            <h3>
              {weather.location.name} , {weather.location.country}
            </h3>
            <p>{`Temperature is: ${weather.current.temp_c}°C`}</p>
            <p>{weather.current.condition.text}</p>
          </div>
        </>
      )}
    </div>
  );
}
