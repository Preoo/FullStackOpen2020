import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Rating = (props:any) => <li>{props.rating} -- {props.count}</li>
const Display = (props:any) => (
  <ul>
    <Rating rating="good" count={props.good} />
    <Rating rating="neutral" count={props.neutral} />
    <Rating rating="bad" count={props.bad} />
  </ul>
)
const RateButton = (props:any) => (
  <button onClick={props.cb}>
    {props.rating}
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
      <RateButton rating="good" cb={() => set_good(bad + 1)} />
      <RateButton rating="neutral" cb={() => set_neutral(bad + 1)} />
      <RateButton rating="bad" cb={() => set_bad(bad + 1)} />
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)