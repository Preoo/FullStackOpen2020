import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { USER_INFO } from '../Queries'

const Books = ({ show, books }) => {
    // const books = useQuery(BOOKS_INFO)
    const [filter, setFilter] = useState('')
    const [genres, setGenres] = useState([])
    const client = useApolloClient()

    useEffect(() => {
        if (books.data) {
            const mergeGenres = (a, c) => [...a, ...c.genres]
            const genres = books.data.allBooks.reduce(mergeGenres, [])
            setGenres([...new Set(genres)]) // de-duplicate with Set
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

    if (!show) {
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