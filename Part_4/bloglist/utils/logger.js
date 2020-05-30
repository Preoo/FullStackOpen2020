const info = (...args) => process.env.NODE_ENV === 'test' || console.info(...args)
const error = (...args) => console.error(...args)
const log = (...args) => console.log(...args)

module.exports = {info, error, log}