import React, { useState } from 'react'
const Blog = ({ blog, onLikeBlog, onDeleteBlog, isOwner }) => {
    const [compact, SetCompact] = useState(true)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const visible = () => compact ? 'none' : ''

    return (
        <div style={blogStyle}>
            <button className='toggleDetails' onClick={() => SetCompact(!compact)}>
                {compact ? 'more' : 'less'}
            </button>
            {blog.title}
            <div style={{ display: visible() }} className='blog_details'>
                <p>
                    Url: {blog.url}
                </p>
                <p>
                    Author: {blog.author}
                </p>
                <p>
                    Likes: {blog.likes} <button onClick={() => onLikeBlog(blog)}>like</button>
                </p>
                {
                    isOwner === true && <button onClick={() => onDeleteBlog(blog)}>remove</button>
                }
            </div>
        </div>
    )
}

export default Blog
