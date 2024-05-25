import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(url);
  request.then(console.log("data loaded"));
  return request.then((response) => response.data);
};

const getWeather = (lat, lng) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
    import.meta.env.VITE_WEATHER_KEY
  }&units=metric`;
  const request = axios.get(weatherUrl);
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
