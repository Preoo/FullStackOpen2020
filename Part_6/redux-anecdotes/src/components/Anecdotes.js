import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote_anecdote } from '../reducers/anecdoteReducer'
import { show_notification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const vote = anecdote => {
        dispatch(vote_anecdote(anecdote.id))
        dispatch(show_notification(`You voted for ${anecdote.content}`))
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