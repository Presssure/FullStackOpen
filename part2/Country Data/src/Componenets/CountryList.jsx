import Country from "./Country";
import countryService from "../Service/countryService";
import Button from "./Button";

const CountryList = ({ countries, clickHandler }) => {
  // console.log(countries[0].name.official);

  return (
    <ul>
      {countries.map((c) => (
        <p key={c.name.common}>
          {c.name.common} <Button country={c} clickHandler={clickHandler} />
        </p>
      ))}
    </ul>
  );
};

export default CountryList;
