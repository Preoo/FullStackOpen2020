import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-4567890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  type Contact = {name:string, number:string}
  // Filters
  const filter_existing = (phonebook:Contact[], contact:Contact): boolean =>
    phonebook.find(person => person.name === contact.name) === undefined
  const filter_has_number = (phonebook:Contact[], contact:Contact): boolean =>
    contact.number.length ? true : false
  
  const add_person = (event:any) => {
    event.preventDefault()
    const filters = [filter_existing, filter_has_number]
    const messages = [`${newName} is already recorded`, `number-field cannot by empty`]
    const contact:Contact = {name: newName, number: newNumber}
    const errors = filters.map(f => f(persons, contact))

    if (errors.every(err => err)) {
      setPersons(persons.concat(contact))
    } else {
      errors.forEach((ok, i) => {if (!ok) alert(messages[i])})
    }
    setNewName('')
    setNewNumber('')
  }

  // Event handlers
  const on_name_change = (event:any) => (
    setNewName(event.target.value)
  )
  const on_number_change = (event:any) => (
    setNewNumber(event.target.value)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add_person}>
        <div>
          name: <input value={newName} onChange={on_name_change}/>
          number: <input value={newNumber} onChange={on_number_change}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(contact =>
        <p key={contact.name}>{contact.name} : {contact.number}</p>
      )}
    </div>
  )
}

export default App
