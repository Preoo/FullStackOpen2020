import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    if (!user) return null

    return (
        <div>
            <h3>
                {user.name}
            </h3>
            <h5>
                has added blogs:
            </h5>
            <ul>
                {user.blogs.map(blog =>
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </div>
    )
}

const Users = ({ users }) => (
    <ol>
        {users.map(user =>
            <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                    {user.name} has added {user.blogs.length} blogs.
                </Link>
            </li>
        )}
    </ol>
)

export { Users, User }