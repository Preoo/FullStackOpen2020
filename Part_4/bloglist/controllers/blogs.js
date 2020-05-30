const blog_router = require('express').Router()
const Blog = require('../models/blog')

blog_router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blog_router.post('/', async (request, response) => {
    const blog = await (new Blog(request.body)).save()
    response.status(201).json(blog.toJSON())
})

module.exports = blog_router