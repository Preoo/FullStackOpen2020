const reset_router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

// call this route in beforeEach func during e2e-tests
// to reset (more like empty) testing database 
reset_router.post('/', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

module.exports = reset_router