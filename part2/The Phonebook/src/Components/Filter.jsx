const Filter = ({ persons, filter, setFilter, setFilteredList }) => {
  const onChangeFilter = (event) => {
    const input = event.target.value;
    setFilter(input);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredList(filtered);
  };
  return (
    <div>
      filter shown with
      <input onChange={onChangeFilter} value={filter} />
    </div>
  );
};

export default Filter;
