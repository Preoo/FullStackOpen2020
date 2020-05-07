import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {get, add} from './services/persons'

// Filters
const filter_existing = (phonebook: Contact[], contact: Contact): boolean =>
  phonebook.find(person => person.name === contact.name) === undefined
const filter_has_number = (phonebook: Contact[], contact: Contact): boolean =>
  contact.number.length ? true : false

// Components
export type Contact = { name: string, number: string, id:number }
const ContactDetail = ({ name, number, id }: Contact) => (<p>[{id}]{name} : {number}</p>)

type ContactProps = { phonebook: Contact[], filter: string }
const Contacts = ({ phonebook, filter }: ContactProps) => {
  return (
    <div>
      {phonebook
        .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        .map(contact =>
          <ContactDetail key={contact.id} name={contact.name} number={contact.number} id={contact.id} />
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
  const [persons, setPersons] = useState([] as Contact[]) // Appease TS error:
  const [newName, setNewName] = useState('')              //  Type * is not assignable to
  const [newNumber, setNewNumber] = useState('')          //  parameter of type 'SetStateAction<never[]>'
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    get().then(resp => setPersons(resp.data))
  }, [])

  // Event handlers
  const add_person = (event: any) => {
    event.preventDefault()
    const filters = [filter_existing, filter_has_number]
    const messages = [`${newName} is already recorded`, `number-field cannot by empty`]
    // const max_id:number = Math.max(...persons.map(p => p.id)) // need max of id to keep them consistant if we allow deletion
    const contact:Partial<Contact> = { 
      name: newName,
      number: newNumber,
      // id: max_id + 1
    }
    const errors = filters.map(f => f(persons, contact as Contact))

    if (errors.every(err => err)) {
      // save new contact to db with POST
      add(contact as Contact)
        .then(resp => setPersons([...persons, resp.data as Contact]))
    } else {
      errors.forEach((ok, i) => { if (!ok) alert(messages[i]) })
    }
    setNewName('')
    setNewNumber('')
  }

  const edit_person = (event: any) => {
    event.preventDefault()
    // map over contacts and if id === edited.id than swap numbers
  }
  
  const remove_person = (event: any) => {
    event.preventDefault()
    // array.filter with func id !== to_be_removed
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
