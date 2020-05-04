import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const add_person = (event:any) => {
    event.preventDefault()
    setPersons([...persons, {name: newName}])
    setNewName('')
  }

  const on_name_change = (event:any) => (
    setNewName(event.target.value)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add_person}>
        <div>
          name: <input value={newName} onChange={on_name_change}/>
        </div>
        <div>
          <button type="submit">add: {newName}</button>
        </div>
      </form>
      <h2>Names</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App
