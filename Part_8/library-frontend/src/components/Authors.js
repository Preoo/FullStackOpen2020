
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { AUTHOR_INFO, EDIT_AUTHOR } from '../Queries'

const Authors = (props) => {
    const authors = useQuery(AUTHOR_INFO)

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [
            { 
                query: AUTHOR_INFO
            }
        ]}
    )

    const [editedAuthorName, setEditedAuthor] = useState('')
    const [editedBorn, setEditedBorn] = useState('')

    const handleAuthorEdit = event => {
        event.preventDefault()
        editAuthor({
            variables: {
                name: editedAuthorName,
                born: editedBorn
            }
        })
        setEditedAuthor('')
        setEditedBorn('')
    }

    if (!props.show) {
        return null
    }

    if (authors.loading) {
        return (
            <>
                loading author info...
            </>
        )
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {authors.data.allAuthors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <form onSubmit={handleAuthorEdit}>
                <select value={editedAuthorName}
                    onChange={({ target }) => setEditedAuthor(target.value)}
                >
                    {authors.data.allAuthors.map(author =>
                        <option key={author.name} value={author.name}>
                            {author.name}
                        </option>
                    )}
                </select>
                <input type='number' value={editedBorn}
                    onChange={({ target }) => setEditedBorn(+target.value)} />
                <button type='submit'>edit</button>
            </form>
        </div>
    )
}

export default Authors
