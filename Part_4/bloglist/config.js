require('dotenv').config()
const in_test_env = process.env.NODE_ENV === 'test'
// if we need to differentiate between prod, dev, and test, redo this module
const MONGO_URL = process.env.MONGO_URL
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = in_test_env ? process.env.TEST_MONGO_DB : process.env.MONGO_DB
const EXPRESS_PORT = process.env.EXPRESS_PORT

module.exports = {
    MONGO_URL,
    MONGO_PORT,
    MONGO_DB,
    EXPRESS_PORT
}