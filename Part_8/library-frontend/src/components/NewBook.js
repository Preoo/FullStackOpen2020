import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, AUTHOR_INFO, BOOKS_INFO } from '../Queries'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [errors, setErrors] = useState([])

    const [addNewBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { 
                query: AUTHOR_INFO
            },
            { 
                query: BOOKS_INFO
            }
        ],
        onError: (error) => setErrors(error.graphQLErrors)
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        console.log('add book...')

        addNewBook({
            variables: {
                title,
                author,
                published,
                genres
            }
        })

        setTitle('')
        setPublished('')
        setAuhtor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <div style={{color: 'red'}}>
                {errors.map(error => 
                    <span>error.message</span>
                )}
            </div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuhtor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(+target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>
                <div>
                    genres: {genres.join(' ')}
                </div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook