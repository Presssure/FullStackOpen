import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [vote, setVote] = useState(new Uint8Array(anecdotes.length));

  const [largest, setLargest] = useState(0);

  const onNext = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const onVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
    const max = Math.max(...copy);
    setLargest(copy.indexOf(max));
  };

  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button onClick={onVote} text="vote" />
      <Button onClick={onNext} text="next anecdote"></Button>
      <p>{anecdotes[largest]}</p>
    </>
  );
};

export default App;
