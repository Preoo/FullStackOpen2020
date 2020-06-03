import React, {useState} from 'react'
const Blog = ({ blog }) => {
    const [compact, SetCompact] = useState(true)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const details = () => (
        <div>
            <p>
            Url: {blog?.url}
            </p>
            <p>
                Author: {blog.author}
            </p>
            <p>
                Likes: {blog.likes} <button>like</button>
            </p>
        </div>

    )
    return (
        <div style={blogStyle}>
            <button onClick={() => SetCompact(!compact)}>
                {compact ? 'more' : 'less'}
            </button>
            {blog.title}
            {
                compact === false
                ? details()
                : ' ..'
            }
        </div>
    )
}

export default Blog
