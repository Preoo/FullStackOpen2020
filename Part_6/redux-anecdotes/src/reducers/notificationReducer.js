const init_message = { message: 'REPLACE ME', visiblity: false }
const notification_reducer = (state = init_message, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data

        case 'HIDE':
            return action.data

        default: return state
    }
}

export const show_notification_async = (notification, duration) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW',
            data: {
                message: notification,
                visiblity: true
            } })
        setTimeout(() => {
            dispatch({
                type: 'HIDE',
                data: {
                    message: '',
                    visiblity: false
                } })
        }, duration * 1000)
    }
}

export default notification_reducer