import React from 'react'
import { useDispatch } from 'react-redux'
import { add_anecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const add = event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(add_anecdote(anecdote))
    }

    return (
        <aside>
            <header>
                <h2>Add New</h2>
            </header>
            <form onSubmit={add}>
                <input name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </aside>
    )
}

export default AnecdoteForm