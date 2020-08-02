import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { BOOKS_INFO, USER_INFO } from '../Queries'

const Books = (props) => {
    const books = useQuery(BOOKS_INFO)
    const [filter, setFilter] = useState('')
    const [genres, setGenres] = useState([])
    const client = useApolloClient()

    useEffect(() => {
        if (books.data) {
            const reducer = (a, c) => [...a, ...c.genres]
            const genresArray = books.data.allBooks.reduce(reducer, [])
            setGenres([...new Set(genresArray)])
        }
    }, [books.data])

    const setUserFavGenre = genre => {
        setFilter(genre)
        try {
            const userInfo = client.readQuery({ query: USER_INFO })
            client.writeQuery({
                query: USER_INFO,
                data: { ...userInfo, me: { ...userInfo.me, favourite: genre }}
            })
        } catch (ex) {
            // console.error(ex)
            console.log('user is not logged in')
        }
    }

    if (!props.show) {
        return null
    }

    if (books.loading) {
        return (
            <>
                loading books info...
            </>
        )
    }

    return (
        <div>
            <h2>books</h2>
            <p>in genre <em>{filter || 'any'}</em></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {books.data.allBooks
                        .filter(book => filter === '' || book.genres.includes(filter))
                        .map(a =>
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        )}
                </tbody>
            </table>
            {genres.map((genre, index) => (
                <button key={index} onClick={() => setUserFavGenre(genre)}>{genre}</button>
            ))}
            <button onClick={() => setUserFavGenre('')}>any</button>
        </div>
    )
}

export default Books