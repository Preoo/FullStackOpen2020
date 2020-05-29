// const http = require('http')

const config = require('./config')
const logger = require('./utils/logger')
const app = require('./app')

const PORT = config.EXPRESS_PORT
app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT}`)
})