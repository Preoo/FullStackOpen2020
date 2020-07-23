import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    const notification = useSelector(state => state.notification)

    const render_notification = (notification) => (
        notification.visiblity
            ? <div style={style}>{notification.message}</div>
            : null
    )

    return (
        render_notification(notification)
    )
}

export default Notification