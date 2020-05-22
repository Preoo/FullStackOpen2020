const express = require('express')
const app = express()
const base_api = '/api/persons/'
let persons = [
    {
      "name": "feelsgoodman",
      "number": "clap",
      "id": 1
    },
    {
      "name": "asd",
      "number": "asd",
      "id": 2
    }
]

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

app.delete(`${base_api}:id`, (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== +id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}.`)
})
