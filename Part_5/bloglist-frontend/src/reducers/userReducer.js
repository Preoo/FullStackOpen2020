import blogService from '../services/blogs'
import loginService from '../services/login'

const user_reducer = (state={}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return action.data
        case 'LOG_OUT':
            return {}
        default: return state
    }
}

export const user_log_in = ({ username, password }) => {
    return async dispatch => {
        const persistingUser = window.localStorage.getItem('loggedBlogUser')
        if (persistingUser) {
            const user = JSON.parse(persistingUser)
            blogService.setToken(user.token)
            dispatch({ type: 'LOG_IN', data: user })
        } else {
            const user = await loginService.login({ username: username, password: password })
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({ type: 'LOG_IN', data: user })
        }
    }
}

export const user_log_out = () => {
    return async dispatch => {
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogUser')
        dispatch({ type: 'LOG_OUT', data: null })
    }
}

export default user_reducer