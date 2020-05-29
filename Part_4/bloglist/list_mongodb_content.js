require('dotenv').config()
const mongoose = require('mongoose')

// Creating new users with docker here is just annoying and not needed.
// Below is connection string incase you would use auth-option where creds are loaded from .env.
// const CONNECT_URI_AUTH = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${MONGO_DB}`
const CONNECT_URI = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

mongoose.connect(CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.error(`mongoose error: ${err}`))

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
const Blog = mongoose.model('Blog', blogSchema)
console.info('Blogs:')
Blog.remove({}) //console.info(`${person.name} ${person.number}`)
    .then(blogs => blogs.forEach(blog => console.log(blog)))
    .catch(() => console.log('Docker up db-server dummy'))
    .finally(() => mongoose.connection.close())
console.info('exit')