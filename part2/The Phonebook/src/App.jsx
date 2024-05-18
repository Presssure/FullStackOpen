import { useState } from "react";

import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        persons={persons}
        setFilter={setFilter}
        setFilteredList={setFilteredList}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        number={number}
        persons={persons}
        setPersons={setPersons}
        setFilteredList={setFilteredList}
        setNewName={setNewName}
        setNumber={setNumber}
      />
      <h3>Numbers</h3>
      {filteredList.map((person) => (
        <Persons key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
