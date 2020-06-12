import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hide_notification } from '../reducers/notificationReducer'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()
    const render_notification = (notification) => (
        notification.visiblity
        ? <div style={style}>{notification.message}</div>
        : null
    )

    useEffect(() => {
        setTimeout(() => {
            if (notification.visiblity) {
                dispatch(hide_notification())
            }
        }, 5000)
    }, [notification, dispatch])

    return (
        render_notification(notification)
    )
}

export default Notification