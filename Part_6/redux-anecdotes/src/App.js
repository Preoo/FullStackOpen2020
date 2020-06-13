import React, { useEffect } from 'react'
import './App.css'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { init_anecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(init_anecdotes())
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
