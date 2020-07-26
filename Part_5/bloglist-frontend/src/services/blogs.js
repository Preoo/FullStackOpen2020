import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

// left as is since it's used in useEffect hook
// if this is refactored into a async fun,
// useEffect needs to call a separate async func or
// use an IIFE.
// const getBlogs = () => {
//     const request = axios.get(baseUrl)
//     return request.then(response => response.data)
// }

const getBlogs = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postBlog = async blog => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateBlog = async (id, data) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const uri = `${baseUrl}/${id}`
    const response = await axios.put(uri, data, config)
    return response.data
}

const deleteBlog = async id => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const uri = `${baseUrl}/${id}`
    const response = await axios.delete(uri, config)
    return response.status
}

const commentAnonBlog = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
    return response.data
}

const setToken = newToken => token = `bearer ${newToken}`
export default {
    getBlogs, postBlog, setToken, updateBlog, deleteBlog, commentAnonBlog
}