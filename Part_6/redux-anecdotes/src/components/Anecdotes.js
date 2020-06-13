import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote_anecdote } from '../reducers/anecdoteReducer'
import { show_notification_async } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
    const dispatch = useDispatch()
    const vote = anecdote => {
        dispatch(vote_anecdote(anecdote))
        dispatch(show_notification_async(`You voted for ${anecdote.content}`, 10))
    }

    return (
        anecdotes.map(anecdote =>
            <section key={anecdote.id}>
                <p>
                    {anecdote.content}
                </p>
                <p>
                    has {anecdote.votes} votes
                    <button onClick={() => vote(anecdote)}>
                        vote
                    </button>
                </p>
            </section>
        )
    )
}

export default Anecdotes