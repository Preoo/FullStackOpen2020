require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')
// Creating new users with docker here is just annoying and not needed.
// Below is connection string incase you would use auth-option where creds are loaded from .env.
// const CONNECT_URI_AUTH = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${MONGO_DB}`
const CONNECT_URI = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

mongoose.connect(CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.error(`mongoose error: ${err}`))

// const super_user = new User({
//     username: 'root',
//     name: 'root'
// })

// super_user.save()

// const super_user = User.findById('5ed4ee9fc2889c34ccf6ab8b')
// const super_blog = new Blog({
//     title: 'testing',
//     author: 'testing',
//     url: 'testing',
//     likes: 0,
//     user: super_user._id
// })

// super_blog.save()

Blog.find({})
    .then(blogs => blogs.forEach(blog => console.log(blog)))
    .catch(() => console.log('Docker up db-server dummy'))
    .finally(() => mongoose.connection.close())
console.info('exit')