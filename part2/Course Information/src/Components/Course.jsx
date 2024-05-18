const Course = ({ course }) => {
  let temp = 0;
  course.parts.map((p) => (temp += p.exercises));

  const total = course.parts.reduce((sum, i) => {
    return sum + i.exercises;
  }, 0);
  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((p) => (
        <p key={p.id}>
          {p.name} {p.exercises}
        </p>
      ))}
      <b>total of {total} exercises</b>
    </>
  );
};

export default Course;
