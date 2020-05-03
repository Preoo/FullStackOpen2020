import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Rating = (props:any) => (
  // <li>{props.label} -- {props.value}</li>
  <tr>
    <td>{props.label}</td>
    <td>{props.value.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
  </tr>
)
const Metrics = (props:any) => {
  const {good, neutral, bad} = props
  const total:number = good + neutral + bad
  const avg:number = (good - bad) / (total)
  const positive:number = (good / total) * 100.0

  // No feedback given
  if (total === 0) return <p>No feedback to display</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <Rating label="good" value={good} />
        <Rating label="neutral" value={neutral} />
        <Rating label="bad" value={bad} />
        <Rating label="all" value={total} />
        <Rating label="average" value={avg} />
        <Rating label="positive" value={positive} />
      </tbody>
      <tfoot></tfoot>
    </table>
  )
}
const RateButton = (props:any) => (
  <button onClick={props.cb}>
    {props.label}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, set_good] = useState(0)
  const [neutral, set_neutral] = useState(0)
  const [bad, set_bad] = useState(0)

  return (
    <div>
      <h1>Rate unicafe</h1>
      <RateButton label="good" cb={() => set_good(good + 1)} />
      <RateButton label="neutral" cb={() => set_neutral(neutral + 1)} />
      <RateButton label="bad" cb={() => set_bad(bad + 1)} />
      <h2>Statistics</h2>
      <Metrics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)