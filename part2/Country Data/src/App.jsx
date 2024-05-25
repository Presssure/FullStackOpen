import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./Componenets/CountryList/";
import countryService from "./Service/countryService";
import Country from "./Componenets/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [showSingle, setShowSingle] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const onInput = (event) => {
    setShowSingle(null);
    setSearch(event.target.value);

    const filteredList = countries.filter((c) =>
      c.name.official.toLowerCase().includes(event.target.value)
    );
    setDisplay(filteredList);
  };

  const clickHandler = (country) => {
    console.log(country);
    setShowSingle(country);
  };
  return (
    <>
      <p>
        Find countries: <input onChange={onInput} />
      </p>
      {showSingle ? (
        <Country country={showSingle} />
      ) : display.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : display.length === 1 ? (
        <Country country={display[0]} />
      ) : (
        <CountryList countries={display} clickHandler={clickHandler} />
      )}
    </>
  );
}

export default App;
