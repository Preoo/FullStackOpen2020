import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useMutation, useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { USER_LOGIN, USER_INFO, BOOK_ADDED, BOOKS_INFO, BOOKS_BY_GENRE, SAVE_USER_GENRE } from './Queries'
import Suggested from './components/Suggested'

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

    const books = useQuery(BOOKS_INFO)
    const [getSuggested, suggestedResults] = useLazyQuery(BOOKS_BY_GENRE)

    const [getUser, getUserResults] = useLazyQuery(USER_INFO)
    const [loginQuery, loginResult] = useMutation(USER_LOGIN, {
        onError: error => setErrors(error.graphQLErrors)
    })
    const [saveUserGenre] = useMutation(SAVE_USER_GENRE, {
        onError: error => setErrors(error.graphQLErrors)
    })

    const updateCache = (object, onQuery, onKey) => {
        const cacheContains = (cache, object) =>
            cache.map(c => c.title).includes(object.title)

        const dataStore = client.readQuery({ query: onQuery })
        if (!cacheContains(dataStore[onKey], object)) {
            client.writeQuery({
                query: onQuery,
                data: { [onKey]: dataStore[onKey].concat(object) }
            })
        }
    }
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const newBook = subscriptionData.data.bookAdded
            setErrors([{message: `new book from subscription: ${newBook.title}`}])
            updateCache(newBook, BOOKS_INFO, 'allBooks')
        }
    })

    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        if (token) {
            setToken(token)
            getUser()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (loginResult.data && loginResult.data.login.value) {
            const userToken = loginResult.data.login.value
            setToken(userToken)
            localStorage.setItem('library-user-token', userToken)
            getUser()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginResult.data])

    useEffect(() => {
        if (books.data && getUserResults.data && getUserResults.data.me) {
            if (suggestedResults.data) {
                suggestedResults.refetch({
                    genre: getUserResults.data.me.favourite
                })
            } else {
                getSuggested({
                    variables: {
                        genre: getUserResults.data.me.favourite
                    }
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books.data, getUserResults.data])

    const login = (creds) => {
        setErrors([])
        loginQuery({ variables: creds })
    }
    const logout = async () => {
        const user = client.readQuery({ query: USER_INFO })
        await saveUserGenre({ variables: { genre: user.me.favourite} })
        setToken(null)
        setErrors([])
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <Errors errors={errors} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token === null && <button onClick={() => setPage('login')}>login</button>}
                {token !== null && <button onClick={() => setPage('add')}>add book</button>}
                {token !== null && <button onClick={() => setPage('suggested')}>for your pleasure</button>}
                {token !== null && <button onClick={() => logout()}>logout</button>}
            </div>

            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} books={books} />
            <NewBook show={page === 'add'} setErrors={setErrors} />
            { page === 'login' && <LoginForm handleLogin={login} />}
            { (page === 'suggested' && token) && <Suggested books={suggestedResults} genre={getUserResults}/>}
        </div>
    )
}

export default App