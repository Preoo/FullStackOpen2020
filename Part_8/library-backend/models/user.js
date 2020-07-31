const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favourite: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', schema)
