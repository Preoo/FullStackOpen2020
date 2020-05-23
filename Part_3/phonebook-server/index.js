require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const base_api = '/api/persons/'
const Person = require('./models/person')
// Utilities and Functions
let persons = [
    {
      name: "feelsgoodman",
      number: 321,
      id: 1
    },
    {
      name: "asd",
      number: "123",
      id: "2"
    }
]

const get_random_id = (max) => Math.floor(Math.random() * Math.floor(max))

// middlewares
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan( (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    req.method === 'POST' ? `body:${JSON.stringify(req.body)}` : '',
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res), 'ms'
  ].filter(Boolean).join(' ')
} ))

// Routes

app.get('/', (req, res) => {
	res.send('hello')
})

app.get('/info', (req, res) => {
  const now = new Date()
  res.send(`Phonebook has info on ${persons.length} people.<br>
  ${now.toString()}`)
})

app.get(`${base_api}`, (req, res) => {
  // res.json(persons)
  Person.find({})
    .then(persons => res.json(persons))
    .catch(err => {
      console.error(err)
      res.status(404).end()
    })
    // .finally(() => mongoose.connection.close())
})

app.get(`${base_api}:id`, (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === +id)
  person ? res.send(person) : res.status(404).end()
})

app.post(`${base_api}`, (req, res) => {
  const {name, number} = req.body || {}

  if (!name || !number) return res.status(400).json(
    { error:'content missing. A valid name and number is required.'})

  const new_person = new Person({
    name: name,
    number: number,
  })

  new_person.save()
    .then(saved_person => res.json(saved_person))
    .catch(err => {
      console.error(err)
      res.status(400).json({error: 'malformed id'})
    })
    // .finally(() => mongoose.connection.close())
})

app.delete(`${base_api}:id`, (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== +id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}.`)
})
