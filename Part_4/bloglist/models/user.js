const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    password_hash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        },
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password_hash
    }
})

// Instead of pulling a plugin, I just added this validion handle to scheme
// Taken without shame from https://stackoverflow.com/a/54721095
// ERROR: Causes validation errors when updating users blogs arrays in blogs.js router :/
// userSchema.path('username').validate(async (value) => {
//     const usernameCount = await mongoose.models.User.countDocuments({ name: value })
//     return !usernameCount
// }, 'Username must be unique, (even if telling this opens us for enum attacks)')

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User