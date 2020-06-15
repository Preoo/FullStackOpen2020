/**
* Connected version of components to practise legacy methods.
* Missing functionality for voting is fine per assigment instructions.
*/
import React from 'react'
import { connect } from 'react-redux'
import { show_notification_async } from '../reducers/notificationReducer'
import { vote_anecdote } from '../reducers/anecdoteReducer'

const ConnectedAnecdotes = (props) => {
    // const anecdotes = useSelector(state => {
    //     return state.anecdotes.filter(a => a.content.includes(state.filter))
    // })
    // const dispatch = useDispatch()
    const vote = anecdote => {
        // dispatch(vote_anecdote(anecdote))
        // dispatch(show_notification_async(`You voted for ${anecdote.content}`, 10))
        props.show_notification_async(`Voted for ${anecdote.content}`, 2)
        props.vote_anecdote(anecdote)
    }

    return (
        props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
    return { anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter)) }
}

const mapDispatchToProps = {
    show_notification_async,
    vote_anecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAnecdotes)