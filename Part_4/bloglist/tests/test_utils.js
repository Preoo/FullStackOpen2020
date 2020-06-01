const documents_in_database = async (documents_type) => {
    const things = await documents_type.find({})
    return things.map(thing => thing.toJSON())
}

module.exports = {
    documents_in_database,
}