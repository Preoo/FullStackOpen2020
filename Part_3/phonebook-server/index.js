const express = require('express')
const app = express()

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

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}.`)
})
