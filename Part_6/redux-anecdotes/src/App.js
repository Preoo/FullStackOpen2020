import React from 'react'
import './App.css'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'

const App = () => (
    <article>
        <header>
            <h2>
                Anecdotes
            </h2>
        </header>
        <Anecdotes />
        <AnecdoteForm />
        <footer>
            footer text
        </footer>
    </article>
)

export default App
