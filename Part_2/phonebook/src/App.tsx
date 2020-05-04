import React, { useState } from 'react'

// Filters
const filter_existing = (phonebook: Contact[], contact: Contact): boolean =>
  phonebook.find(person => person.name === contact.name) === undefined
const filter_has_number = (phonebook: Contact[], contact: Contact): boolean =>
  contact.number.length ? true : false

// Components
type Contact = { name: string, number: string }
const ContactDetail = ({ name, number }: Contact) => (<p>{name} : {number}</p>)

type ContactProps = { phonebook: Contact[], filter: string }
const Contacts = ({ phonebook, filter }: ContactProps) => {
  return (
    <div>
      {phonebook
        .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        .map(contact =>
          <ContactDetail key={contact.name} name={contact.name} number={contact.number} />
        )}
    </div>
  )
}

const Input = (props: any) => (<input value={props.input_value} onChange={props.on_change} />)
const Form = (props: any) => {
  // There is some redundancy in following logic, for example one could pass inputs as array and loop thru to add them.
  // But hardcoded form is good enough for now.
  return (
    <form onSubmit={props.on_submit}>
      <div>
        name: {props.name_input}
      </div>
      <div>
        number: {props.number_input}
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  // State
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // Event handlers
  const add_person = (event: any) => {
    event.preventDefault()
    const filters = [filter_existing, filter_has_number]
    const messages = [`${newName} is already recorded`, `number-field cannot by empty`]
    const contact: Contact = { name: newName, number: newNumber }
    const errors = filters.map(f => f(persons, contact))

    if (errors.every(err => err)) {
      setPersons(persons.concat(contact))
    } else {
      errors.forEach((ok, i) => { if (!ok) alert(messages[i]) })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Form on_submit={add_person}
        name_input={<Input input_value={newName} on_change={(event: any) => setNewName(event.target.value)} />}
        number_input={<Input input_value={newNumber} on_change={(event: any) => setNewNumber(event.target.value)} />}
      />

      <h2>Numbers</h2>
      <div>
        <span>Filter:</span>
        <Input input_value={newFilter} on_change={(event: any) => setNewFilter(event.target.value)} />
        <Contacts phonebook={persons} filter={newFilter} />
      </div>
    </div>
  )
}

export default App
