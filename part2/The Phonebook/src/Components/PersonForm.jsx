const PersonForm = ({
  persons,
  setPersons,
  setFilteredList,
  setNewName,
  setNumber,
  newName,
  number,
}) => {
  const onAdd = (event) => {
    event.preventDefault();

    let same = false;
    for (const i of persons) {
      if (i.name === newName) {
        alert(`${newName} is already added to phone book`);
        same = true;
        break;
      }
    }
    if (!same) {
      const personObject = {
        name: newName,
        number: number,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setFilteredList(persons.concat(personObject));
      setNewName("");
      setNumber("");
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
