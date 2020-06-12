import anecdote_reducer from './reducers/anecdoteReducer'
import notification_reducer from './reducers/notificationReducer'
import filter_reducer from './reducers/filterReducer'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
    anecdotes: anecdote_reducer,
    notification: notification_reducer,
    filter: filter_reducer
})
const store = createStore(reducer)

export default store