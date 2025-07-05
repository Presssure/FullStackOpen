const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((p) => (
      <Part key={p.id} part={p} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((count, current) => {
    return count + current.exercises;
  }, 0);
  // parts.reduce((s, p) => s + p.exercises, 0)}
  return <b>total of {sum} exercises</b>;
};

export default Course;
