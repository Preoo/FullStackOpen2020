import React from 'react';
import ReactDOM from 'react-dom';

type PartElement = {
  name:string,
  exercises:number,
}
type Course = {
  name:string,
  parts:PartElement[],
}

const Header = ({name}:Course) => (
  <h1>{name}</h1>
)

const Content = ({parts}:Course) => {
  let course_content = []
  for (const part of parts) {
    course_content.push(<Part name={part.name} exercises={part.exercises} />)
  }
  return (
    <div>
      {course_content}
    </div>
  )
}

const Part = ({name, exercises}:PartElement) => (
  <p>{name} {exercises}</p>
)

const Total = ({parts}:Course) => {
  let total:number = 0

  parts.forEach((part) => total += part.exercises)

  return (
    <p>Number of exercises: {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }

  return (
    <div>
      <Header {...course} />
      <Content {...course} />
      <Total {...course} />
    </div>
  )
}

ReactDOM.render
(
  <App />,
  document.getElementById('root')
)