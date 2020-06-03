import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [addBlog, setAddBlog] = useState({})
    const [notification, setNewNotification] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    // try get user from localstorage
    useEffect(() => {
        const persistingUser = window.localStorage.getItem('loggedBlogUser')
        if (persistingUser) {
            const user = JSON.parse(persistingUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const logOut = () => {
        blogService.setToken(null)
        setUser(null)
        window.localStorage.removeItem('loggedBlogUser')
    }
    const handleLogin = async event => {
        event.preventDefault()
        console.log(`logging in with ${username} : ${password}`)
        try {
            const user = await loginService.login({ username: username, password: password })
            setUser(user)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            console.log(user)
            setUsername('')
            setPassword('')
            setNewNotification('Logged in')
            blogService.setToken(user.token)
            setTimeout(() => setNewNotification(null), 2000)
        } catch (e) {
            setNewNotification('Invalid credetials')
            setTimeout(() => setNewNotification(null), 5000)
        }
    }

    const handleNewBlog = async event => {
        event.preventDefault()
        console.log(`adding new blog: ${addBlog}`)
        try {
            const blog = await blogService.postNew(addBlog)
            if (blog) {
                setBlogs(blogs.concat(blog))
            }
            setAddBlog({})

            setNewNotification('added blog')
            setTimeout(() => setNewNotification(null), 2000)
        } catch (e) {
            setNewNotification('invalid token')
            setTimeout(() => setNewNotification(null), 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin} >
            <div>
                username
                    <input type='text' value={username} name='Username'
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                    <input type='text' value={password} name='Password'
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    const userDisplay = () => (
        <div>
            <p>Hello {user.name}</p>
            <button onClick={logOut}>log out</button>
        </div>
    )

    const blogForm = () => (
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={handleNewBlog} >
                <div>
                    title
                <input type='text' name='Title'
                        onChange={({ target }) => setAddBlog({ ...addBlog, title: target.value })} />
                </div>
                <div>
                    author
                <input type='text' name='Author'
                        onChange={({ target }) => setAddBlog({ ...addBlog, author: target.value })} />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )

    if (!user) {
        return (
            loginForm()
        )
    }

    return (
        <div>
            <Notification message={notification} />
            {
                userDisplay()
            }
            {
                blogForm()
            }

            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App