const Button = ({ country, clickHandler }) => {
  return <button onClick={() => clickHandler(country)}>show</button>;
};

export default Button;
