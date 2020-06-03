import axios from 'axios'
const login_api = '/api/login'

const login = async creds => {
    const response = await axios.post(login_api, creds)
    return response.data
}

export default { login }