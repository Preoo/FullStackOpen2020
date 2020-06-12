import React from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = id => dispatch({ type: 'VOTE', id: id })


    return (
        <article>
            <header>
                <h2>
                    Anecdotes
                </h2>
            </header>
            {anecdotes.map(anecdote => 
                <section key={anecdote.id}>
                    <p>anecdote.content</p>
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
                <form>
                    <div><input /></div>
                    <button>create</button>
                </form>
            </aside>
            <footer>
                footer block
            </footer>
        </article>
    )
}

export default App
