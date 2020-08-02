import React, { useState } from 'react'

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
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input type='password' id='passwordInput' value={password} name='Password'
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button id='loginButton' type='submit'>login</button>
        </form>
    )
}

export default LoginForm