import React from 'react'

const Suggested = ({books, genre}) => {

    if (books.loading) {
        return (
            <>
                loading ...
            </>
        )
    }

    return (
        <div>
            <h2>books</h2>
            <p>in suggested genre <em>{genre.data.me.favourite}</em></p>
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
                        // .filter(book => book.genres.includes(user.data.me.favourite))
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