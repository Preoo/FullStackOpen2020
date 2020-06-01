const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blog_router = require('./controllers/blogs')
const user_router = require('./controllers/users')
const login_router = require('./controllers/login')

logger.info('Attempting mongoDB connection')
const mongoUrl = `mongodb://${config.MONGO_URL}:${config.MONGO_PORT}/${config.MONGO_DB}`
const mongoose_opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}

mongoose.connect(mongoUrl, mongoose_opts)
logger.info(`Successfully connected to mongoDB collection ${config.MONGO_DB} on ${config.MONGO_URL}`)

app.use(cors())
app.use(express.json())
app.use(middleware.log_request)
app.use(middleware.get_token_from_request)

app.use('/api/login', login_router)
app.use('/api/blogs', blog_router)
app.use('/api/users', user_router)

app.use(middleware.blackhole_endpoint)
app.use(middleware.error_handler)

module.exports = app