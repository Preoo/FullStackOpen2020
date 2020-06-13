import React, { useEffect } from 'react'
import './App.css'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdote_service from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { init_anecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdote_service
            .getAnecdotes()
            .then(data => dispatch(init_anecdotes(data)
            ))
    }, [dispatch])

    return (
        <article>
            <header>
                <h2>
                    Anecdotes
                </h2>
            </header>
            <Filter />
            <Anecdotes />
            <AnecdoteForm />
            <Notification />
            <footer>
                footer text
            </footer>
        </article>
    )
}

export default App
