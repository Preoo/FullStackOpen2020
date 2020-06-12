import anecdote_reducer from './reducers/anecdoteReducer'
import notification_reducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
    anecdotes: anecdote_reducer,
    notification: notification_reducer
})
const store = createStore(reducer)

export default store