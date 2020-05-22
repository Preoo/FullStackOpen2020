const express = require('express')
const app = express()
const base_api = '/api/persons/'
let persons = [
    {
      name: "feelsgoodman",
      number: 321,
      id: 1
    },
    {
      name: "asd",
      number: 123,
      id: 2
    }
]

const get_random_id = (max) => Math.floor(Math.random() * Math.floor(max))

// middlewares
app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello')
})

app.get('/info', (req, res) => {
  const now = new Date()
  res.send(`Phonebook has info on ${persons.length} people.<br>
  ${now.toString()}`)
})

app.get(`${base_api}`, (req, res) => {
	res.json(persons)
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
  
  if (persons.find(person => person.name === name)) return res.status(400).json({
    error: 'for some reason names must be unique 🤔'
  })
  
  const new_person = {
    name: name,
    number: number,
    id: get_random_id(Number.MAX_SAFE_INTEGER)
  }
  console.log(new_person)
  persons = persons.concat(new_person)
  res.json(new_person)
})

app.delete(`${base_api}:id`, (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== +id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}.`)
})
