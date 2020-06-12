import React from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { vote_anecdote, add_anecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    
    const vote = id => dispatch(vote_anecdote(id))

    return (
        <article>
            <header>
                <h2>
                    Anecdotes
                </h2>
            </header>
            {anecdotes.map(anecdote => 
                <section key={anecdote.id}>
                    <p>
                        {anecdote.content}
                    </p>
                    <p>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote.id)}>
                            vote
                        </button>
                    </p>
                </section>
            )}
            <AnecdoteForm />
            <footer>
                footer block
            </footer>
        </article>
    )
}

export default App
