const notification_reducer = (state = { message: 'REPLACE ME' }, action) => {
    return state
}

export const show_notification = (notification) => {
    return {
        message: notification
    }
}

export default notification_reducer