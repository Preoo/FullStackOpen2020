const blog_router = require('express').Router()
const Blog = require('../models/blog')

blog_router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blog_router.post('/', (request, response, error_handler) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(err => error_handler(err))
})

module.exports = blog_router