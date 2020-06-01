const login_router = require('express').Router()
const User = require('../models/user')
// const config = require('../config')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {login_error} = require('../utils/errors')

login_router.post('/', async (request, response) => {
    const creds = request.body

    const user = await User.findOne({ username: creds.username })
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