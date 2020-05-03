import React, { useState } from 'react'
import ReactDOM from 'react-dom'

interface Anecdotes {
  anecdotes: string[]
}
const App = ({anecdotes}:Anecdotes) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.from(Array(anecdotes.length), () => 0)) // This way TS can infer correct type for votes
  const this_should_be_std_func = (min:number, max:number) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min))
  const get_next_anecdote = () => setSelected(this_should_be_std_func(0, anecdotes.length - 1))
  const set_vote = () => {
    // I miss Python and it's comprehensions 😢
    let new_votes = [...votes]
    new_votes[selected] += 1
    setVotes(new_votes)
  }
  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {votes[selected]} votes
      </p>
      <button onClick={get_next_anecdote}>next</button>
      <button onClick={set_vote}>vote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)