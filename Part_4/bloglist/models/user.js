const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    password_hash: String,
    notes: [
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
userSchema.path('username').validate(async (value) => {
    const usernameCount = await mongoose.models.User.countDocuments({ name: value })
    return !usernameCount
}, 'Username must be unique, (even if telling this opens us for enum attacks)')

const User = mongoose.model('User', userSchema)

module.exports = User