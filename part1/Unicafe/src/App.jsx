import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad > 0) {
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
            value={((good / (good + neutral + bad)) * 100)
              .toString()
              .concat(" %")}
          />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => {
    setGood(good + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
