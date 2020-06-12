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

export const show_notification = (notification) => {
    return {
        type: 'SHOW',
        data: {
            message: notification,
            visiblity: true
        }
    }
}
export const hide_notification = () => {
    return {
        type: 'HIDE',
        data: {
            message: '',
            visiblity: false
        }
    }
}

export default notification_reducer