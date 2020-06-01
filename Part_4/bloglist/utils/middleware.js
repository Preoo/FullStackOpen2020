const logger = require('./logger')
const errors = require('./errors')

const log_request = (req, res, next) => {
    const log_line = `
    Method: ${req.method}
    Path: ${req.path}
    Body: ${JSON.stringify(req.body) || ''}
    ----`
    logger.info(log_line)
    next()
}

const blackhole_endpoint = (req, res) => res.status(404).json(errors.unknown_endpoint_error)

const error_handler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).json(errors.malformed_mongo_id_error)
    }

    if (error.name === 'ValidationError') return res.status(400).json(
        { error: error.message })

    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json(errors.invalid_token_error)
    }

    // pass to default error handler
    next(error)
}

module.exports = {
    log_request,
    blackhole_endpoint,
    error_handler
}