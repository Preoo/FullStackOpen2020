require('dotenv').config()
const mongoose = require('mongoose')

// Creating new users with docker here is just annoying and not needed.
// Below is connection string incase you would use auth-option where creds are loaded from .env.
// const CONNECT_URI_AUTH = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${MONGO_DB}`
const CONNECT_URI = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
console.info(`Connecting to mongoDB at ${CONNECT_URI}`)

const mongoose_opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}

mongoose.connect(CONNECT_URI, mongoose_opts)
    .then(() => console.info(`Connected to ${process.env.MONGO_DB}`))
    .catch(err => console.error(`mongoose error: ${err.message}`))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Instead of pulling a plugin, I just added this validion handle to scheme
// Taken without shame from https://stackoverflow.com/a/54721095
personSchema.path('name').validate(async (value) => {
    const emailCount = await mongoose.models.Person.countDocuments({ name: value })
    return !emailCount
}, 'Name must be unique (for some reason 🤔)')

// const close_connection = () => mongoose.connection.close(() => process.exit(0))
// If the Node process ends, close the Mongoose connection
// https://gist.github.com/pasupulaphani/9463004
// Seems to be pointless, using mongo shell, active and current connections are
// closed when terminating task with this block commented.
// process.on('SIGINT', close_connection).on('SIGTERM', close_connection);

module.exports = mongoose.model('Person', personSchema)