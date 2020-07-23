import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { show_notification_async } from './reducers/notificationReducer'
import { get_blogs, add_blog, like_blog, delete_blog } from './reducers/blogReducer'
import { user_log_out, user_log_in } from './reducers/userReducer'
import { Switch, Route } from 'react-router-dom'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogFormRef = React.createRef()

    // Redux refactorings
    const dispatch = useDispatch()
    const blogs = useSelector(store => store.blogs)
    const user = useSelector(store => store.user)

    useEffect(() => {
        const fun = () => dispatch(get_blogs())
        fun()
    }, [dispatch])

    // try get user from localstorage
    useEffect(() => {
        dispatch(user_log_in({ username: 'not_used', password: 'not_used' }))
    }, [dispatch])

    const logOut = () => {
        dispatch(user_log_out())
        setUsername('')
        setPassword('')
    }

    const notify = message => {
        dispatch(show_notification_async(message, 5))
    }

    const handleLogin = async event => {
        event.preventDefault()
        console.log(`logging in with ${username} : ${password}`)
        try {
            dispatch(user_log_in({ username: username, password: password }))
            notify(`Welcome ${username}`)
            setUsername('')
            setPassword('')
        } catch (e) {
            notify('Invalid credentials')
        }
    }

    const handleNewBlog = async newblog => {
        blogFormRef.current.toggleVisibility()
        console.log(`adding new blog: ${newblog}`)
        try {
            dispatch(add_blog(newblog))
            notify('added blog')
        } catch (e) {
            notify('invalid token')
        }
    }

    const handleLike = async blog => {
        console.log(`adding like to blog: ${blog}`)
        try {
            dispatch(like_blog(blog))
        } catch (e) {
            notify('invalid token')
        }
    }

    const handleDelete = async blog => {
        if (window.confirm(`Really delete blog ${blog.title}`)) {
            try {
                dispatch(delete_blog(blog))
            } catch (e) {
                notify('invalid token')
            }
        }
    }

    const UserDisplay = () => (
        <div>
            <p>Hello {user.name}</p>
            <button onClick={logOut}>log out</button>
        </div>
    )

    if (!user.name) {
        return (
            <div>
                <Notification />
                <LoginForm
                    handleLogin={handleLogin}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    username={username}
                    password={password}
                />
            </div>
        )
    }

    return (
        <div>
            <Switch>
                <Route path='/'>
                    <Notification />
                    <UserDisplay />

                    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm addNewBlog={handleNewBlog}/>
                    </Toggleable>
                    <h2>Blogs</h2>

                    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                        <Blog key={blog.id} blog={blog}
                            onLikeBlog={handleLike}
                            onDeleteBlog={handleDelete}
                            isOwner={blog.user && (blog.user === user.id || blog.user.id === user.id)}
                            // above is due to unfortunate bug where in new blogs user is a id:string and blogs from api/blogs contain populated user object
                            // it shall stay as is since this is last part where it is needed
                        />
                    )}
                </Route>
            </Switch>
        </div>
    )
}

export default App