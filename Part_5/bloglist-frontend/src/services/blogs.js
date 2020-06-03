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

const setToken = newToken => token = `bearer ${newToken}`
export default { getAll, postNew, setToken }