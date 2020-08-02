import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_INFO } from '../Queries'

const Books = (props) => {
    const books = useQuery(BOOKS_INFO)
    const [filter, setFilter] = useState('')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        if (books.data) {
            const reducer = (a, c) => [...a, ...c.genres]
            const genresArray = books.data.allBooks.reduce(reducer, [])
            setGenres([...new Set(genresArray)])
        }
    }, [books.data])

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
                <button key={index} onClick={() => setFilter(genre)}>{genre}</button>
            ))}
            <button onClick={() => setFilter('')}>any</button>
        </div>
    )
}

export default Books