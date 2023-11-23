import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import './Phonebook.module.css';

const Phonebook = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [state, setState] = useState({
    contacts: initialContacts,
    filter: '',
    name: '',
    number: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number, contacts } = state;

    // Verificăm dacă numele există deja în contacte
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const numberExists = contacts.some(contact => contact.number === number);

    if (nameExists) {
      alert(
        'The contact with this name already exists in the phonebook. Please choose a different name.'
      );
      return;
    }

    if (numberExists) {
      alert(
        'This phone number already exists in the phone book. Please choose a different phone number.'
      );
      return;
    }

    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in all fields to add a contact.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setState({
      contacts: [...state.contacts, newContact],
      name: '',
      number: '',
      filter: '',
    });
  };

  const handleFilterChange = e => {
    setState({
      ...state,
      filter: e.target.value,
    });
  };

  const filteredContacts = state.contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(state.filter.toLowerCase()) ||
      contact.number.includes(state.filter)
  );

  const handleDelete = id => {
    const updatedContacts = state.contacts.filter(contact => contact.id !== id);

    setState({
      ...state,
      contacts: updatedContacts,
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        name={state.name}
        number={state.number}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div>
        <label>
          Search contact:
          <input
            type="text"
            name="filter"
            value={state.filter}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
};

export default Phonebook;
