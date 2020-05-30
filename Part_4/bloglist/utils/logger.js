const info = (...args) => process.env.NODE_ENV === 'test' || console.info(...args)
const error = (...args) => process.env.NODE_ENV === 'test' || console.error(...args)
const log = (...args) => process.env.NODE_ENV === 'test' || console.log(...args)

module.exports = { info, error, log }