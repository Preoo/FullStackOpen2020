const login_router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { login_error, login_error_no_hash } = require('../utils/errors')

login_router.post('/', async (request, response) => {
    const creds = request.body

    const user = await User.findOne({ username: creds.username })

    if (!user.password_hash) return response.status(401).json(login_error_no_hash)

    const login_valid = user === null
        ? false
        : await bcrypt.compare(creds.password, user.password_hash)

    if (!login_valid) return response.status(401).json(login_error)

    const token = jwt.sign(
        {
            username: user.username,
            id: user._id
        }, process.env.JWT_SECRET)
    response.status(200).send({token, username: user.username, name: user.name})

})

module.exports = login_router