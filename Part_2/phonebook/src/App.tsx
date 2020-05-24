import React, { useState, useEffect } from 'react'
import { get, add, modify, remove } from './services/persons'

// Filters
const filter_existing = (phonebook: Contact[], contact: Contact): boolean =>
  phonebook.find(person => person.name === contact.name) === undefined

// Components
// message_types are: 'success' and 'error'
type Notification = { message: string, message_type: string }
const Notification = ({ message, message_type }: Notification) => (
  (message && message_type) ? <div className={message_type}>{message}</div> : null
)

type Clickable = { remove_person: any }
export type Contact = { name: string, number: string, id: string | number }
const ContactDetail = (props: Contact | Clickable) => (
  <p className='contact'><button onClick={(event: any) => (props as Clickable).remove_person((props as Contact).id)}>Remove</button> {(props as Contact).name} : {(props as Contact).number}</p>
)

// Consider lifting ContactDetail to render prop
type ContactProps = { phonebook: Contact[], filter: string }
const Contacts = (props: ContactProps | Clickable) => {
  const { phonebook, filter } = props as ContactProps
  const { remove_person } = props as Clickable
  return (
    <div className='phonebook'>
      {phonebook
        .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        .map(contact =>
          <ContactDetail key={contact.id} name={contact.name} number={contact.number} id={contact.id} remove_person={remove_person} />
        )}
    </div>
  )
}

const Input = (props: any) => {
  if (props.required) return <input value={props.input_value} onChange={props.on_change} required />
  return <input value={props.input_value} onChange={props.on_change} />
}
const Form = (props: any) => {
  // There is some redundancy in following logic, for example one could pass inputs as array and loop thru to add them.
  // But hardcoded form is good enough for now.
  return (
    <form onSubmit={props.on_submit}>
      <div className='form-input'>
        Name: {props.name_input}
      </div>
      <div className='form-input'>
        Number: {props.number_input}
      </div>
      <div className='form-input'>
        <button type="submit">Add</button>
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
  const [notification, setNewNotification] = useState({})

  const show_notification = (notification: Notification) => {
    setNewNotification(notification)
    setTimeout(() => setNewNotification({}), notification.message_type === 'success' ? 2000 : 5000)
  }

  useEffect(() => {
    get()
      .then(resp => setPersons(resp.data))
      .catch(_ => {
        show_notification({ message: `Failed to retrieve contacts`, message_type: 'error' })
      })
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
        .then(() => {
          show_notification({ message: `Added ${contact.name} to phonebook`, message_type: 'success' })
        })
        .catch(err => {
          // console.error(err.response)
          show_notification({ message: `Failed to add new contact because ${err.response.data.error}`, message_type: 'error' })
        })
    } else {
      // modify existing contact
      if (window.confirm(`Set new number for ${contact?.name}?`)) {
        const old: string | number = (persons.find(p => p.name === (contact as Contact).name) as Contact).id
        modify(old, contact as Contact)
          .then(resp => resp.data as Contact)
          .then(modified => setPersons(persons.map(person => person.id === modified.id ? modified : person)))
          .then(() => show_notification({ message: `Success`, message_type: 'success' }))
          .catch(err => {
            show_notification({ message: `Failed to modify contact because ${err.response.data.error}`, message_type: 'error' })
            setPersons(persons.filter(p => p.id !== old))
            /*if status code is 404 - Not Found
                -> filter erronous person from list
              else
                -> leave old in there
            */
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const remove_person = (id: string | number) => {
    const remove_person = persons.find(person => person.id === id)
    if (window.confirm(`Remove contact ${remove_person?.name}?`)) {
      remove(id).then(_ => setPersons(persons.filter(person => person.id !== id)))
        .catch(err => show_notification({ message: `Failed to remove contact because ${err.response.data.error}`, message_type: 'error' }))
    }
  }

  return (
    <div className='main'>
      <div>
        <h2>Phonebook</h2>
        <Form on_submit={add_person}
          name_input={<Input input_value={newName} on_change={(event: any) => setNewName(event.target.value)} required={true} />}
          number_input={<Input input_value={newNumber} on_change={(event: any) => setNewNumber(event.target.value)} required={true} />}
        />
        <Notification {...notification as Notification} />
      </div>

      <div>
        <h2>Numbers</h2>
        <span>Filter: </span>
        <Input input_value={newFilter} on_change={(event: any) => setNewFilter(event.target.value)} />
        <Contacts phonebook={persons} filter={newFilter} remove_person={remove_person} />
      </div>
    </div>
  )
}

export default App
