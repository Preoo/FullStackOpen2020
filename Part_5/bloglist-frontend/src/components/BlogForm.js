import React, {useState} from 'react'

const BlogForm = ({addNewBlog}) => {
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
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={addBlog} >
                <div>
                    title
                <input type='text' value={title} name='Title'
                        onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author
                <input type='text' value={author} name='Author'
                        onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default BlogForm