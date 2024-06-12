import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import personService from "./Services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState(persons);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
      setFilteredList(data);
    });
  }, []);

  const remove = (id, name) => {
    if (window.confirm("Delete " + name + " ?")) {
      personService.remove(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
        setFilteredList(persons.filter((p) => p.id !== id));
      });
    }
  };

  const updateNotification = (person, type) => {
    const messageObject = {
      name: person.name,
      type: type,
    };
    setNotification(messageObject);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
        updateNotification={updateNotification}
      />
      <h3>Numbers</h3>
      {filteredList.map((person) => (
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          onRemove={() => remove(person.id, person.name)}
          id={person.id}
        />
      ))}
    </div>
  );
};

export default App;
