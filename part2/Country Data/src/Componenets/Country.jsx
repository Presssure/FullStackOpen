import countryService from "../Service/countryService";
import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState("");
  const languageArray = [];
  for (const key in country.languages) {
    languageArray.push(country.languages[key]);
  }

  useEffect(() => {
    countryService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then((response) => setWeather(response));
  }, []);

  // for (const key in weather) {
  //   console.log(key);
  // }
  // console.log(weather.main);

  if (!weather) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h2>name: {country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languageArray.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} width={150} />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.main.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Country;
