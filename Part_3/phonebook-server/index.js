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

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}.`)
})
