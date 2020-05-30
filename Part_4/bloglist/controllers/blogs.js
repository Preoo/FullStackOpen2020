const blog_router = require('express').Router()
const Blog = require('../models/blog')

blog_router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blog_router.post('/', async (request, response) => {
    const { title, url } = request.body
    if (!(title || url)) return response.status(400).end()

    const blog = await (new Blog(request.body)).save()
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