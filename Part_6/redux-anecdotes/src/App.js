import React from 'react'
import './App.css'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'

const App = () => (
    <article>
        <header>
            <h2>
                Anecdotes
            </h2>
        </header>
        <Anecdotes />
        <AnecdoteForm />
        <Notification />
        <footer>
            footer text
        </footer>
    </article>
)

export default App
