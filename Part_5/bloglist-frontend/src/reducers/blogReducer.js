import blogService from '../services/blogs'

const blogs_reducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_ALL':
            return action.data
        case 'LIKE':
            return state.map(blog =>
                blog.id === action.data.id
                    ? action.data
                    : blog)
        case 'ADD':
            return [...state, action.data]
        case 'DELETE':
            return state.filter(blog => blog.id !== action.data.id)
        default: return state
    }
}

export const get_blogs = () => {
    return async dispatch => {
        const blogs = await blogService.getBlogs()
        console.log('get_blogs action creator')
        console.log(blogs)
        dispatch({ type: 'GET_ALL', data: blogs })
    }
}

export const add_blog = (blog) => {
    return async dispatch => {
        const response = await blogService.postBlog(blog)
        dispatch({ type: 'ADD', data: response })
    }
}

export const delete_blog = (blog) => {
    return async dispatch => {
        const response_status = await blogService.deleteBlog(blog.id)
        if (response_status === 204) dispatch({ type: 'DELETE', data: blog })
    }
}

export const like_blog = (blog) => {
    return async dispatch => {
        const update_fields = { likes: blog.likes + 1 }
        const updated_blog = await blogService.updateBlog(blog.id, update_fields)
        dispatch({ type: 'LIKE', data: updated_blog })
    }
}

export default blogs_reducer