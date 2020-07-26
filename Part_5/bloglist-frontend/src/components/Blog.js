import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add_comment_blog } from '../reducers/blogReducer'
import { ButtonOK, ButtonRemove } from './CommonStyled'
const Blog = ({ blog, onLikeBlog, onDeleteBlog, isOwner }) => {

    const [userComment, setUserComment] = useState('')
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        // border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleComments = () => {
        dispatch(add_comment_blog(blog, userComment))
        setUserComment('')
    }

    if (!blog) return <div>Blog not found</div>

    return (
        <article className='blog_main' style={blogStyle}>
            <header>
                <h1>
                    {blog.title}
                </h1>
            </header>
            <section className='blog_details'>
                <p>
                    Url: {blog.url}
                </p>
                <p>
                    Author: {blog.author}
                </p>
                <p>
                    Likes: {blog.likes}
                </p>
                {/* className of likeButton was hidden by adblock origin :D */}
                <ButtonOK className='like_Button' onClick={() => onLikeBlog(blog)}>
                        like this blog
                </ButtonOK>
                {
                    isOwner === true && <ButtonRemove className='removeButton' onClick={() => onDeleteBlog(blog)}>delete</ButtonRemove>
                }
                <aside id='blog_comments'>
                    <em>comments</em>
                    <ul>
                        {blog.comments.map((comment, index) =>
                            <li key={index} >
                                {comment}
                            </li>
                        )}
                    </ul>
                    <input onChange={e => setUserComment(e.target.value)} placeholder='leave a comment'/>
                    <ButtonOK onClick={() => handleComments()}> Send </ButtonOK>
                </aside>
            </section>
        </article>
    )
}

export default Blog
