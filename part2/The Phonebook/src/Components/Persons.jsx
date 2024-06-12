const Persons = ({ name, number, onRemove }) => {
  return (
    <>
      <p>
        {name} {number}
        <button onClick={onRemove}>delete</button>
      </p>
    </>
  );
};

export default Persons;
