import anecdote_reducer from './reducers/anecdoteReducer'
import notification_reducer from './reducers/notificationReducer'
import filter_reducer from './reducers/filterReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anecdote_reducer,
    notification: notification_reducer,
    filter: filter_reducer
})
// Do it this way instead using dev tools
const store = createStore(reducer, applyMiddleware(thunk));
// const store = createStore(reducer)

export default store