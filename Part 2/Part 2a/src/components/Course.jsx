import { useState } from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ courses }) => {
  const value = courses.parts;
  const unit = value.map((course) => {
    return (
      <p key={course.id}>
        {course.name} {course.exercises}
      </p>
    );
  });

  return <>{unit}</>;
};

const Total = ({ course }) => {
  /* the one i made */
  const myCourse = course.parts;
  let sum = 0;
  myCourse.forEach((course) => {
    sum += course.exercises;
  });
  return <h4> total of {sum} exercises</h4>;
};

const Totaler = ({ course }) => {
  /* the one for exercise  2.3 */
  const myCourse = course.parts.map((part) => part.exercises);

  const total = myCourse.reduce((sum, part) => {
    return sum + part;
  }, 0);
  return <h4>total of {total} exercises</h4>;
};

const Course = ({ courses }) => {
  const data = courses.map((course) => {
    return course;
  });

  return (
    <>
      <Header course={data[0]} />
      <Content courses={data[0]} />
      <Totaler course={data[0]} />

      <Header course={data[1]} />
      <Content courses={data[1]} />
      <Totaler course={data[1]} />
    </>
  );
};

export default Course;
