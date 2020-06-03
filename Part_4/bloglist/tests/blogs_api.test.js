const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { mock_blogs, mock_users } = require('./mock_data')
const { documents_in_database } = require('./test_utils')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

// test utility functions
const generate_missing_id = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}
// compat shim
const blogs_in_database = async () => {
    const doc = await documents_in_database(Blog)
    return doc
}

beforeEach(async () => {
    await Blog.deleteMany({})
    const fresh_blogs = mock_blogs.map(blog => new Blog(blog))
    await Promise.all(fresh_blogs.map(blog => blog.save()))

    await User.deleteMany({})
    const fresh_users = mock_users.map(user => new User(user))
    await Promise.all(fresh_users.map(user => user.save()))
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
        expect(received_blogs.body).toHaveLength(mock_blogs.length)
    })

    test('endpoint defines property .id for blogs', async () => {
        const received_blogs = await api.get('/api/blogs')
        const extracted_blogs = received_blogs.body.map(blog => blog)
        extracted_blogs.forEach(blog => expect(blog.id).toBeDefined())
    })

})

describe('POST api/blogs', () => {
    let token
    beforeEach(async () =>  {
        const user = {
            name: 'new_user',
            username: 'new_user',
            password: 'new_user',
        }
        await api.post('/api/users').send(user)
        const resp = await api.post('/api/login').send(user)
        token = resp.body.token
    })
    test('adding new blog is successful', async () => {
        const new_blog = {
            title: 'TEST BLOG',
            author: 'tester',
            url: 'https://example.com/',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const updated_blogs = await api.get('/api/blogs')
        expect(updated_blogs.body).toHaveLength(mock_blogs.length + 1)
        expect(updated_blogs.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(new_blog)
            ])
        )
        const latest_blog_index = mock_blogs.length
        expect(updated_blogs.body[latest_blog_index].user).toBeDefined()
    })

    test('if posted blog has missing property .likes, it defaults to 0', async () => {
        const new_blog = {
            title: 'TEST BLOG',
            author: 'tester',
            url: 'https://example.com/'
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(response.body.likes).toBe(0)
    })

    test('if posted blog is missing title and url, endpoint responds with status 400 - Bad Request', async () => {
        const invalid_blog = {
            author: 'Invalid',
            likes: 0
        }
        const startstate = await blogs_in_database()
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalid_blog).expect(400)
        const endstate = await blogs_in_database()
        expect(endstate.length).toBe(startstate.length)
    })

    test('if request is missing valid token, adding new blog should fail', async () => {
        const startstate = await blogs_in_database()
        const new_blog = {
            title: 'TEST BLOG',
            author: 'tester',
            url: 'https://example.com/'
        }
        await api
            .post('/api/blogs')
            // .set('Authorization', '')
            .send(new_blog)
            .expect(401)
        await api
            .post('/api/blogs')
            .set('Authorization', '')
            .send(new_blog)
            .expect(401)
        const endstate = await blogs_in_database()
        expect(endstate.length).toBe(startstate.length)
    })
})

describe('DELETE /api/blogs/:id', () => {
    let token
    beforeEach(async () =>  {
        const user = {
            name: 'new_user',
            username: 'new_user',
            password: 'new_user',
        }
        await api.post('/api/users').send(user)
        const resp = await api.post('/api/login').send(user)
        token = resp.body.token
    })
    test('endpoint responses with 400 on invalid id', async () => {
        const startstate = await blogs_in_database()
        await api.delete('/api/blogs/11111111').expect(400)
        const endstate = await blogs_in_database()
        expect(endstate.length).toBe(startstate.length)
    })

    test('endpoint responses with 204 if no such blog exists', async () => {
        const missing_id = await generate_missing_id()
        const startstate = await blogs_in_database()
        await api.delete(`/api/blogs/${missing_id}`).expect(204)
        const endstate = await blogs_in_database()
        expect(endstate.length).toBe(startstate.length)
    })

    test('endpoint deletes a blog correctly', async () => {
        const startstate = await blogs_in_database()

        const new_blog = {
            title: 'TEST BLOG',
            author: 'tester',
            url: 'https://example.com/',
            likes: 1
        }
        const blog_to_be_deleted = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog)

        await api.delete(`/api/blogs/${blog_to_be_deleted.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const endstate = await blogs_in_database()
        expect(endstate.length).toBe(startstate.length)
        expect(endstate.map(b => b.title)).not.toContain(new_blog.title)
    })

    test('deleting a blog should fail with 401 if token is invalid', async () => {
        const startstate = await blogs_in_database()
        await api.delete(`/api/blogs/${startstate[0].id}`).expect(401)
        const endstate = await blogs_in_database()
        expect(endstate.length).toBe(startstate.length)
    })
})

describe('PUT /api/blogs/:id', () => {

    test('likes on blog are updated when passed a full object', async () => {
        const startstate = await blogs_in_database()
        const updated = { ...startstate[0], likes: 13 }
        await api.put(`/api/blogs/${updated.id}`).send(updated).expect(200)
        const endstate = await blogs_in_database()
        expect(endstate[0].likes).toBe(13)
    })

    test('likes on blog are updated when passed a object containing only likes count', async () => {
        const startstate = await blogs_in_database()
        const updated = { likes: 13 }
        await api.put(`/api/blogs/${startstate[0].id}`).send(updated).expect(200)
        const endstate = await blogs_in_database()
        expect(endstate[0].likes).toBe(13)
        expect(endstate[0].title).toBe(startstate[0].title)
    })

    test('operation fails with empty body', async () => {
        const startstate = await blogs_in_database()
        await api.put(`/api/blogs/${startstate[0].id}`).send({}).expect(400)
        const endstate = await blogs_in_database()
        expect(endstate).toContainEqual(startstate[0])
    })
})

afterAll(() => {
    mongoose.connection.close()
})