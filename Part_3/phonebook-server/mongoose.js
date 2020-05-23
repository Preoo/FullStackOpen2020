require('dotenv').config()
const mongoose = require('mongoose')

// Creating new users with docker here is just annoying and not needed.
// Below is connection string incase you would use auth-option where creds are loaded from .env.
// const CONNECT_URI_AUTH = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${MONGO_DB}`
const CONNECT_URI = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

mongoose.connect(CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.error(`mongoose error: ${err}`))

// $ node process-2.js one two=three four
// 0: node
// 1: /Users/mjr/work/node/process-2.js
// 2: one
// 3: two=three
// 4: four

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    // id: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
    // just listing current persons db
    console.info('Phonebook: ')
    Person.find({}).then(persons => {
        persons.forEach(person => console.info(`${person.name} ${person.number}`))
        mongoose.connection.close()
      })
} else if (process.argv.length === 4) {
    const name = process.argv[2]
    const number = process.argv[3]
    const person = new Person({
        name: name,
        number: number,
        // id: id
    })
    person.save()
        .then(res => console.log(`Added ${name} to phonebook`))
        .finally(() => mongoose.connection.close())

} else {
    // this chec kshould really be up top :/
    console.error('Usage: node mongoose.js || node mongoose.js add_name add_number')
    mongoose.connection.close()
}
