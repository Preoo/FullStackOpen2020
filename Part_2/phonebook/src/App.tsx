import React, { useState, useEffect } from 'react'
import { get, add, modify, remove } from './services/persons'

// Filters
const filter_existing = (phonebook: Contact[], contact: Contact): boolean =>
  phonebook.find(person => person.name === contact.name) === undefined
const filter_has_number = (phonebook: Contact[], contact: Contact): boolean =>
  contact.number.length ? true : false

// Components
type Clickable = { remove_person: any }
export type Contact = { name: string, number: string, id: number }
const ContactDetail = (props: Contact | Clickable) => (
  <p>[{(props as Contact).id}]{(props as Contact).name} : {(props as Contact).number} <button onClick={(event: any) => (props as Clickable).remove_person((props as Contact).id)}>remove</button> </p>
)

type ContactProps = { phonebook: Contact[], filter: string }
const Contacts = (props: ContactProps | Clickable) => {
  const { phonebook, filter } = props as ContactProps
  const { remove_person } = props as Clickable
  return (
    <div>
      {phonebook
        .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        .map(contact =>
          <ContactDetail key={contact.id} name={contact.name} number={contact.number} id={contact.id} remove_person={remove_person} />
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
    const contact: Partial<Contact> = {
      name: newName,
      number: newNumber,
    }
    const is_new_contact = filter_existing(persons, contact as Contact)
    if (is_new_contact) {
      // save new contact to db with POST
      add(contact as Contact)
        .then(resp => setPersons([...persons, resp.data as Contact]))
    } else {
      // modify existing contact
      if (window.confirm(`Set new number for ${remove_person?.name}`)) {
        const old:number = (persons.find(p => p.name === (contact as Contact).name) as Contact).id
        modify(old, contact as Contact)
          .then(resp => resp.data as Contact)
          .then(modified => setPersons(persons.map(person => person.id === modified.id ? modified : person)))
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const remove_person = (id: number) => {
    const remove_person = persons.find(person => person.id === id)
    if (window.confirm(`Remove contact ${remove_person?.name}`)) {
      remove(id).then(resp => setPersons(persons.filter(person => person.id !== id)))
    }
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
        <Contacts phonebook={persons} filter={newFilter} remove_person={remove_person} />
      </div>
    </div>
  )
}

export default App
