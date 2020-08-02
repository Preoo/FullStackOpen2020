import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_INFO } from '../Queries'

const Books = (props) => {

    const books = useQuery(BOOKS_INFO)

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

    console.log(books)

    return (
        <div>
            <h2>books</h2>

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
                    {books.data.allBooks.map(a =>
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

export default Books