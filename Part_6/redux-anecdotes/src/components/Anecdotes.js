import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote_anecdote } from '../reducers/anecdoteReducer'

const Anecdotes = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const vote = id => dispatch(vote_anecdote(id))

    return (
        anecdotes.map(anecdote => 
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
        )
    )
}

export default Anecdotes