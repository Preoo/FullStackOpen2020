import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postNew = async blog => {
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

const setToken = newToken => token = `bearer ${newToken}`
export default { getAll, postNew, setToken, updateBlog, deleteBlog }