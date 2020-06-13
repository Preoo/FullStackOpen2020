
const anecdote_reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'VOTE':
            const find_anecdote = state.find(a => a.id === action.data.id)
            const voted_anecdote = {
                ...find_anecdote,
                votes: find_anecdote.votes + 1
            }
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

export const vote_anecdote = id => {
    return { type: 'VOTE', data: { id } }
}
export const add_anecdote = anecdote => {
    return { type: 'ADD', data: anecdote}
}
export const init_anecdotes = anecdotes => {
    return { type: 'INIT', data: anecdotes}
}
export default anecdote_reducer