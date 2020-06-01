const blog_router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blog_router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blog_router.post('/', async (request, response) => {
    const { title, url } = request.body
    if (!(title || url)) return response.status(400).end()

    // const user = await User.findById(request.body.user_id)
    const user = (await User.find({}))[0]
    const blog = await (new Blog({...request.body, user: user._id})).save()
    
    user.blogs = user.blogs.concat(blog._id)
    
    await user.save()
    response.status(201).json(blog.toJSON())
})

blog_router.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blog_router.put('/:id', async (request, response) => {
    if (Object.keys(request.body).length === 0) {
        return response.status(400).end()
    }

    const old_blog = await Blog.findById(request.params.id)

    const new_blog = {
        title: request.body.title || old_blog.title,
        author: request.body.author || old_blog.author,
        url: request.body.url || old_blog.author,
        likes: request.body.likes
    }

    const updated_blog = await Blog
        .findByIdAndUpdate(request.params.id, new_blog, { new: true })
    response.json(updated_blog)
})

module.exports = blog_router