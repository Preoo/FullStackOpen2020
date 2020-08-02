import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useMutation, useApolloClient } from '@apollo/client'
import { USER_LOGIN } from './Queries'

const Errors = ({ errors }) => (
    <>
        {errors.map((item, index) => (
            <p key={index} style={{ color: 'red' }}>{item.message}</p>
        ))}
    </>
)

const App = () => {
    const client = useApolloClient()
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [errors, setErrors] = useState([])
    const [loginQuery, loginResult] = useMutation(USER_LOGIN, {
        onError: error => setErrors(error.graphQLErrors)
    })

    useEffect(() => {
        if (loginResult.data && loginResult.data.login.value) {
            const userToken = loginResult.data.login.value
            // console.log(userToken)
            setToken(userToken)
            // console.log(token)
            localStorage.setItem('library-user-token', userToken)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginResult.data])

    // useEffect(() => {
    //     console.log(`token state: ${token}`)
    // }, [token])

    const login = (creds) => {
        setErrors([])
        loginQuery({ variables: creds })
    }
    const logout = () => {
        setToken(null)
        setErrors([])
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <Errors errors={errors}/>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token === null && <button onClick={() => setPage('login')}>login</button>}
                {token !== null && <button onClick={() => setPage('add')}>add book</button>}
                {token !== null && <button onClick={() => logout()}>logout</button>}
                {/* <button onClick={() => logout()}>reset</button> */}
            </div>

            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} setErrors={setErrors} />
            { page === 'login' && <LoginForm handleLogin={login} />}
        </div>
    )
}

export default App