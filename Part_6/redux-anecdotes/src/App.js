import React from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { vote_anecdote, add_anecdote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = id => dispatch(vote_anecdote(id))
    const add = event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(add_anecdote(anecdote))
    }

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
            <aside>
                <header>
                    <h2>Add New</h2>
                </header>
                <form onSubmit={add}>
                    <input name='anecdote'/>
                    <button type='submit'>create</button>
                </form>
            </aside>
            <footer>
                footer block
            </footer>
        </article>
    )
}

export default App
