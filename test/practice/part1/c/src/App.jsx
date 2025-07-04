const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>the app is used by pressing the buttons</p>
      </div>
    );
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    setValue(newValue);
    console.log(`value set to ${newValue}`);
  };

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
    setTotal(total + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
      {value}
      <Button onClick={setToValue(1000)} text="set to 1000" />
      <Button onClick={setToValue(0)} text="set to 0" />
      <Button onClick={setToValue(value + 1)} text="increment" />
    </div>
  );
};

export default App;
