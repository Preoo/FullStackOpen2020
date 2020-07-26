import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <form id='loginForm' onSubmit={handleSubmit}>
            <div>
                username
                <input type='text' id='usernameInput' value={username} name='Username'
                    onChange={event => setUsername(event.target.value)} />
            </div>
            <div>
                password
                <input type='password' id='passwordInput' value={password} name='Password'
                    onChange={event => setPassword(event.target.value)} />
            </div>
            <button id='loginButton' type='submit'>login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm