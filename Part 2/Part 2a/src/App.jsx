import Course from "./components/Course";

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={course} />;
};

// const Header = (props) => {
//   return <h1>{props.course}</h1>;
//   console.log(props.course);
// };

// const Total = (props) => {
//   return <p> Number of exercises {props.exer1 + props.exer2 + props.exer3}</p>;
// };

// const CourseInfo = () => {
//   const Content = (props) => {
//     props = {
//       name: course.parts,
//     };
//     return props.name.map((part) => (
//       <p key={part.name}>
//         {part.name} {part.exercise}
//       </p>
//     ));
//   };

//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       { name: "Fundamentals of React", exercise: 10 },
//       { name: "Using props to pass data", exercise: 7 },
//       { name: "State of a component", exercise: 14 },
//     ],
//   };
//   return (
//     <div>
//       <Header course={course.name} />
//       <Content name={course.parts} />
//       <Total
//         exer1={course.parts[0].exercise}
//         exer2={course.parts[1].exercise}
//         exer3={course.parts[2].exercise}
//       />
//     </div>
//   );
// };

// export default CourseInfo;
export default App;
