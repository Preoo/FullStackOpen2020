import axios from 'axios'

const api = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await axios.get(api)
    return response.data
}

const getAnecdote = async (id) => {
    const response = await axios.get(`${api}/${id}`)
    return response.data
}

const postAnecdote = async (anecdote) => {
    const response = await axios.post(api, anecdote)
    return response.data
}

export default { 
    getAnecdotes,
    getAnecdote,
    postAnecdote
}