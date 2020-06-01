const user_creation_validation_error = { error: 'username or password does not meet length requirements' }

const malformed_mongo_id_error = { error: 'malformatted id' }

const unknown_endpoint_error = { error: 'Event horizon ahead, turn back captain!' }

const invalid_token_error = { error: 'invalid token' }

const login_error = { error : 'invalid username and/or password' }

module.exports = {
    user_creation_validation_error,
    malformed_mongo_id_error,
    unknown_endpoint_error,
    invalid_token_error,
    login_error
}