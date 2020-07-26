import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { show_notification_async } from './reducers/notificationReducer'
import { get_blogs, add_blog, like_blog, delete_blog } from './reducers/blogReducer'
import { user_log_out, user_log_in } from './reducers/userReducer'
import {
    Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'
import { Users, User } from './components/Users'
import { get_all_users } from './reducers/usersReducer'
import styled from 'styled-components'
import { ButtonOK } from './components/CommonStyled'

const App = () => {
    const blogFormRef = React.createRef()

    // Redux refactorings
    const dispatch = useDispatch()
    const history = useHistory()
    const blogs = useSelector(store => store.blogs)
    const user = useSelector(store => store.user)
    const users = useSelector(store => store.users)

    useEffect(() => {
        const fun = () => {
            dispatch(get_blogs())
            dispatch(get_all_users())
        }
        fun()
    }, [dispatch])

    // try get user from localstorage
    useEffect(() => {
        dispatch(user_log_in({ username: 'not_used', password: 'not_used' }))
    }, [dispatch])

    const logOut = () => {
        dispatch(user_log_out())
    }

    const notify = message => {
        dispatch(show_notification_async(message, 5))
    }

    const handleLogin = async ({ username, password }) => {
        console.log(`logging in with ${username} : ${password}`)
        try {
            dispatch(user_log_in({ username: username, password: password }))
            notify(`Welcome ${username}`)
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
                history.push('/') // redirect to main page
            } catch (e) {
                notify('invalid token')
            }
        }
    }

    const UserDisplay = () => (
        <>
            <em>
                #{user.name} <ButtonOK onClick={logOut}>log out</ButtonOK>
            </em>
        </>
    )

    const Blogs = ({ blogs }) => (
        <>
            <h1>Blogs</h1>
            <ul>
                {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <span className='blog_link_title'>{blog.title}</span>
                        </Link>
                        <div className='blog_summary'>
                            {blog.likes}👍 {blog.comments.length}📩
                        </div>
                    </li>
                )}
            </ul>
        </>
    )

    const userMatch = useRouteMatch('/users/:id')
    const matchedUser = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const matchedBlog = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    //hack: could also have a user.loggedin in redux store..
    if (!user.token) {
        return (
            <main>
                <LoginForm handleLogin={handleLogin} />
            </main>
        )
    }

    const Main = styled.main`
        padding: 1em;
    `
    return (
        <Main>
            <Notification />
            <nav>
                <Link style={{ paddingRight: 5 }} to='/'>blogs</Link>
                {/* <span>| </span> */}
                <Link style={{ paddingRight: 5 }} to='/users'>users</Link>
                <UserDisplay />
            </nav>
            <Switch>
                <Route path='/login'>
                    <LoginForm handleLogin={handleLogin} />
                </Route>
                <Route path='/users/:id'>
                    <User user={matchedUser} />
                </Route>
                <Route path='/users'>
                    <Users users={users} />
                </Route>
                <Route path='/blogs/:id'>
                    <Blog
                        blog={matchedBlog}
                        onLikeBlog={handleLike}
                        onDeleteBlog={handleDelete}
                        isOwner={matchedBlog && matchedBlog.user && (matchedBlog.user === user.id || matchedBlog.user.id === user.id)} />
                </Route>
                <Route path='/'>
                    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm addNewBlog={handleNewBlog}/>
                    </Toggleable>
                    <Blogs blogs={blogs} />
                </Route>
            </Switch>
        </Main>
    )
}

export default App