const blog_router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { invalid_token_error } = require('../utils/errors')

blog_router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blog_router.post('/', async (request, response) => {
    const { title, url } = request.body
    if (!(title || url)) return response.status(400).end()

    const user_token = jwt.verify(request.token, process.env.JWT_SECRET)
    if (!user_token.id) return response.status(401).json(invalid_token_error)

    const user = await User.findById(user_token.id)
    const blog = await (new Blog({...request.body, user: user._id})).save()
    
    user.blogs = user.blogs.concat(blog._id)
    
    await user.save()
    response.status(201).json(blog.toJSON())
})

blog_router.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(204).end()
    const owner = await User.findById(blog.user)

    const user_token = jwt.verify(request.token, process.env.JWT_SECRET)
    if (!user_token.id) return response.status(401).json(invalid_token_error)

    if (owner._id.toString() !== user_token.id.toString()) {
        return response.status(403).end()
    }

    owner.blogs = owner.blogs.filter(owners_blog => owners_blog._id !== blog._id)
    
    await owner.save()
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blog_router.put('/:id', async (request, response) => {
    if (Object.keys(request.body).length === 0) {
        return response.status(400).end()
    }

    // according to api docs https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate what happens next is pointless as update mongoose transforms update
    // to do a set operation on key's in passed in object.
    // e.g:
    // let query = { name: 'borne' };
    // Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

    // is sent as
    // Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)
    
    // passing code as of commit dcf7ec054c439ec37f524acc51f88e9deff031d0
    // const old_blog = await Blog.findById(request.params.id)
    // const new_blog = {
    //     title: request.body.title || old_blog.title,
    //     author: request.body.author || old_blog.author,
    //     url: request.body.url || old_blog.author,
    //     user: old_blog.user,
    //     likes: request.body.likes
    // }

    // unclear if any other property than .likes needs updating..
    const new_blog = {
        likes: request.body.likes || 0
    }
    const updated_blog = await Blog
        .findByIdAndUpdate(request.params.id, new_blog, { new: true })
    response.json(updated_blog)
})

module.exports = blog_router