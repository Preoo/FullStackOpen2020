require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_DB
const EXPRESS_PORT = process.env.EXPRESS_PORT

module.exports = {
    MONGO_URL,
    MONGO_PORT,
    MONGO_DB,
    EXPRESS_PORT
}