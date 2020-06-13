import anecdote_service from '../services/anecdotes'

const anecdote_reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'VOTE':
            // const find_anecdote = state.find(a => a.id === action.data.id)
            // const voted_anecdote = {
            //     ...find_anecdote,
            //     votes: find_anecdote.votes + 1
            // }
            const voted_anecdote = action.data
            return state.map(anecdote =>
                anecdote.id === voted_anecdote.id
                ? voted_anecdote
                : anecdote
            ).sort((a, b) => b.votes - a.votes)
        case 'ADD':
            return [...state, { content: action.data.content, votes: 0 }]
        case 'INIT':
            return action.data.sort((a, b) => b.votes - a.votes)
        default:
            return state
    }
}

// export const vote_anecdote = id => {
//     return { type: 'VOTE', data: { id } }
// }
export const vote_anecdote = anecdote => {
    return async dispatch => {
        const response = await anecdote_service.voteAnecdote(anecdote)
        dispatch({ type: 'VOTE', data: response })
    }
}
export const add_anecdote = anecdote => {
    return async dispatch => {
        const response = await anecdote_service.postAnecdote(anecdote)
        dispatch({ type: 'ADD', data: response})
    }
}
export const init_anecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdote_service.getAnecdotes()
        dispatch({ type: 'INIT', data: anecdotes})
    }
}
export default anecdote_reducer