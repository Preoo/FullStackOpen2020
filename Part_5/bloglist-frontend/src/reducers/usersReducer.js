import usersService from '../services/users'

// As we fetch all users info on load, this is bad for scaling
// Alternative could be to have users listing component to be
// stateful and fetch users info there. If user goes straigth to detail view,
// then fetch data and stuff it into store?

const users_reducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return action.data
        default: return state
    }
}

export const get_all_users = () => {
    return async dispatch => {
        const users = await usersService.getUsers()
        dispatch({ type: 'GET_ALL_USERS', data: users })
    }
}

export default users_reducer