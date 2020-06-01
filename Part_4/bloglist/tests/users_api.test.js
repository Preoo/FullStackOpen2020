const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { mock_users } = require('./mock_data')
const User = require('../models/user')
const { documents_in_database } = require('./test_utils')
const errors = require('../utils/errors')

const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
    const fresh_users = mock_users.map(user => new User(user))
    await Promise.all(fresh_users.map(user => user.save()))
})

describe('GET /api/users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('endpoint returns correct amount of users', async () => {
        const received_users = await api.get('/api/users')
        expect(received_users.body).toHaveLength(mock_users.length)
    })

    test('endpoint defines properties .id .username .name for users', async () => {
        const received_users = await api.get('/api/users')
        const extracted_users = received_users.body.map(blog => blog)
        extracted_users.forEach(user => {
            expect(user.id).toBeDefined()
            expect(user.username).toBeDefined()
            expect(user.name).toBeDefined()
        })
    })

    test('endpoint does not expose password_hash for users', async () => {
        const received_blogs = await api.get('/api/users')
        const extracted_blogs = received_blogs.body.map(blog => blog)
        extracted_blogs.forEach(blog => expect(blog.password_hash).toBeUndefined())
    })
})

describe('POST /api/users', () => {
    test('can create new user with valid POST request to endpoint', async () => {
        const users_in_db = await documents_in_database(User)
        const user = {
            name: 'new_user',
            username: 'new_user',
            password: 'new_user',
        }
        await api.post('/api/users').send(user).expect(201)
        const updated_users_in_db = await documents_in_database(User)
        expect(updated_users_in_db.length).toBe(users_in_db.length + 1)
    })

    test('cannot create new user with too short username', async () => {
        const users_in_db = await documents_in_database(User)
        const user = {
            name: 'new_user',
            username: 'no',
            password: 'new_user',
        }
        await api.post('/api/users').send(user).expect(400)
            .expect(errors.user_creation_validation_error)
        const updated_users_in_db = await documents_in_database(User)
        expect(updated_users_in_db.length).toBe(users_in_db.length)
    })

    test('cannot create new user with too short password', async () => {
        const users_in_db = await documents_in_database(User)
        const user = {
            name: 'new_user',
            username: 'new_user',
            password: 'no',
        }
        await api.post('/api/users').send(user).expect(400)
            .expect(errors.user_creation_validation_error)
        const updated_users_in_db = await documents_in_database(User)
        expect(updated_users_in_db.length).toBe(users_in_db.length)
    })

    test('cannot create new user with duplicate username', async () => {
        const users_in_db = await documents_in_database(User)
        const user = {
            name: 'test',
            username: mock_users[0].username,
            password: 'test',
        }
        await api.post('/api/users').send(user).expect(400)
        const updated_users_in_db = await documents_in_database(User)
        expect(updated_users_in_db.length).toBe(users_in_db.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})