const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const test_blogs = require('../tests/blogs_for_tests')
const Blog = require('../models/blog')

const api = supertest(app)

beforeAll(async () => {
    await Blog.deleteMany({})
    const fresh_blogs = test_blogs.map(blog => new Blog(blog))
    await Promise.all(fresh_blogs.map(blog => blog.save()))
})

describe('GET api/blogs', () => {
    
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('endpoint returns correct amount of blogs', async () => {
        const received_blogs = await api.get('/api/blogs')
        expect(received_blogs.body).toHaveLength(test_blogs.length)
    })

    test('endpoint defines property .id for blogs', async () => {
        const received_blogs = await api.get('/api/blogs')
        const extracted_blogs = received_blogs.body.map(blog => blog)
        extracted_blogs.forEach(blog => expect(blog.id).toBeDefined())
    })

})


afterAll(() => {
    mongoose.connection.close()
})