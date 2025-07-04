import { useState } from "react";

const Button = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const StatisticLine = ({ text, value }) => {
  console.log(text);
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad <= 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          text="positive"
          value={good / (good + neutral + bad) + " %"}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGood = () => {
    setGood(good + 1);
  };

  const onNeutral = () => {
    setNeutral(neutral + 1);
  };

  const onBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={onGood} name="good" />
      <Button onClick={onNeutral} name="neutral" />
      <Button onClick={onBad} name="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
