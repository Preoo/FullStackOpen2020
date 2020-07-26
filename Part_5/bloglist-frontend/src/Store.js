import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notification_reducer from './reducers/notificationReducer'
import blogs_reducer from './reducers/blogReducer'
import user_reducer from './reducers/userReducer'
import users_reducer from './reducers/usersReducer'

const reducer = combineReducers({
    notification: notification_reducer,
    blogs: blogs_reducer,
    user: user_reducer,
    users: users_reducer
})
// Do it this way instead using dev tools for reasons
const store = createStore(reducer, applyMiddleware(thunk))

export default store