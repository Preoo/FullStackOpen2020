import React from 'react'

const Notification = ({ message }) => (
    message ? <div>{message}</div> : null
)

export default Notification