import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_INFO, USER_INFO } from '../Queries'

const Suggested = (props) => {
    const books = useQuery(BOOKS_INFO)
    const user = useQuery(USER_INFO)

    if (books.loading || user.loading) {
        return (
            <>
                loading ...
            </>
        )
    }

    return (
        <div>
            <h2>books</h2>
            <p>in suggested genre <em>{user.data.me.favourite}</em></p>
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
                        .filter(book => book.genres.includes(user.data.me.favourite))
                        .map(a =>
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default Suggested