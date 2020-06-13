import React from 'react'
import { useDispatch } from 'react-redux'
import { add_anecdote } from '../reducers/anecdoteReducer'
import anecdote_service from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const add = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const new_anecdote = await anecdote_service.postAnecdote({content: anecdote, votes: 0})
        dispatch(add_anecdote(new_anecdote))
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