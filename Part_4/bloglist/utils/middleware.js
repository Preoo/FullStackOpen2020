const logger = require('./logger')

const log_request = (req, res, next) => {
    const log_line = `
    Method: ${req.method}
    Path: ${req.path}
    Body: ${JSON.stringify(req.body) || ''}
    ----`
    logger.info(log_line)
    next()
}

const blackhole_endpoint = (req, res) => res.status(404).json(
    { error: 'Event horizon ahead, turn back captain!' })

const error_handler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') return res.status(400).json(
        { error: error.message })

    // pass to default error handler
    next(error)
}

module.exports = {
    log_request,
    blackhole_endpoint,
    error_handler
}