require('dotenv').config()
const mongoose = require('mongoose')

// Creating new users with docker here is just annoying and not needed.
// Below is connection string incase you would use auth-option where creds are loaded from .env.
// const CONNECT_URI_AUTH = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${MONGO_DB}`
const CONNECT_URI = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
console.info(`Connecting to mongoDB at ${CONNECT_URI}`)
mongoose.connect(CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.info(`Connected to ${process.env.MONGO_DB}`))
    .catch(err => console.error(`mongoose error: ${err.message}`))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    // id: Number,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)