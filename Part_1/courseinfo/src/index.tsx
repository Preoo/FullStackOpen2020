import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props:any) => (
  <h1>{props.course}</h1>
)

type CourseContent = {
  parts:string[],
  exercises:number[],
}
const Content = ({parts, exercises}:CourseContent) => {
  if (parts.length !== exercises.length) return <div><p>Malformed input</p></div>
  const content = parts.map((part, i) => <Part part={part} exercises={exercises[i]} />)
  return (
    <div>
      {content}
    </div>
  )
}

type PartElement = {
  part:string,
  exercises:number,
}
const Part = ({part, exercises}:PartElement) => (
  <p>{part} {exercises}</p>
)

const Total = (props:any) => (
  <p>Number of exercises: {props.exercises.reduce((sum:number, next:number) => sum + next)}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))