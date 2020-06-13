import anecdote_service from '../services/anecdotes'

const anecdote_reducer = (state = [], action) => {

    switch (action.type) {
        case 'VOTE':
            return state.map(anecdote =>
                anecdote.id === action.data.id
                    ? action.data
                    : anecdote
            ).sort((a, b) => b.votes - a.votes)
        case 'ADD':
            return [...state, action.data]
        case 'INIT':
            return action.data.sort((a, b) => b.votes - a.votes)
        default:
            return state
    }
}

export const vote_anecdote = anecdote => {
    return async dispatch => {
        const response = await anecdote_service.voteAnecdote(anecdote)
        dispatch({ type: 'VOTE', data: response })
    }
}
export const add_anecdote = anecdote => {
    return async dispatch => {
        const response = await anecdote_service.postAnecdote(anecdote)
        dispatch({ type: 'ADD', data: response })
    }
}
export const init_anecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdote_service.getAnecdotes()
        dispatch({ type: 'INIT', data: anecdotes })
    }
}
export default anecdote_reducer