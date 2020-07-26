import React, { useState } from 'react'
import { ButtonOK, Form } from './CommonStyled'

const BlogForm = ({ addNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        addNewBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        // <div>
            <Form id='addBlogForm' onSubmit={addBlog}>
                <h3>Add new blog</h3>
                    <p>
                        <label htmlFor='Title'>
                            Title:
                        </label>
                        <input id='inputTitle' type='text' value={title} name='Title'
                            onChange={({ target }) => setTitle(target.value)} />
                    </p>
                    <p>
                        <label htmlFor='Author'>
                            Author:
                        </label>
                        <input id='inputAuthor' type='text' value={author} name='Author'
                            onChange={({ target }) => setAuthor(target.value)} />
                    </p>
                    <p>
                        <label htmlFor='Url'>
                            Url:
                        </label>
                        <input id='inputUrl' type='text' value={url} name='Url'
                            onChange={({ target }) => setUrl(target.value)} />
                    </p>
                    <ButtonOK type='submit'>add</ButtonOK>
            </Form>
        // </div>
    )
}

export default BlogForm