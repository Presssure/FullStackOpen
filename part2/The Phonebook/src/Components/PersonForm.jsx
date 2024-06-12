import axios from "axios";
import personService from "../Services/persons";
const PersonForm = ({
  persons,
  setPersons,
  setFilteredList,
  setNewName,
  setNumber,
  newName,
  number,
  updateNotification,
}) => {
  const onAdd = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: number,
    };
    let same = false;
    for (const i of persons) {
      if (i.name === newName) {
        if (i.number !== number) {
          if (
            window.confirm(
              `${newName} is already added to phone book, replace the old number with a new one?`
            )
          ) {
            personService
              .update(i.id, personObject)
              .then((response) => {
                setNewName("");
                setNumber("");
                setFilteredList(
                  persons.map((person) =>
                    person.id === response.id
                      ? { ...person, number: number }
                      : person
                  )
                );
                setPersons(
                  persons.map((person) =>
                    person.id === response.id
                      ? { ...person, number: number }
                      : person
                  )
                );
                updateNotification(response, "update");
              })
              .catch((error) => {
                updateNotification(personObject, "deleted");
                setPersons(persons.filter((p) => p.id !== i.id));
                setFilteredList(persons.filter((p) => p.id !== i.id));
              });
          }
        } else {
          alert(`${newName} is already added to phone book`);
        }

        same = true;
        break;
      }
    }
    if (!same) {
      personService.create(personObject).then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setFilteredList(persons.concat(returnedData));
        setNewName("");
        setNumber("");
        updateNotification(returnedData, "add");
      });
    }
  };

  const onChange = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  return (
    <form onSubmit={onAdd}>
      <div>
        name: <input onChange={onChange} value={newName} />
      </div>
      <div>
        number: <input onChange={onChangeNumber} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
