const user_router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { user_creation_validation_error } = require('../utils/errors')

const bcrypt_salt_rounds = 10

user_router.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url:1, title:1, author: 1})
    response.json(users)
})

user_router.post('/', async (request, response) => {
    const { username, password, name } = request.body
    // validate username password legnth req 401 Unauthorized
    // for real you would also check if password has sufficient complexity.
    if ((!username || username.length < 3) || (!password || password.length < 3)) {
        return response.status(400).json(user_creation_validation_error)
    }

    const password_hash = await bcrypt.hash(password, bcrypt_salt_rounds)
    const user = await (new User({
        username: username,
        name: name || username,
        password_hash: password_hash,
    })).save()
    response.status(201).json(user)
})

module.exports = user_router