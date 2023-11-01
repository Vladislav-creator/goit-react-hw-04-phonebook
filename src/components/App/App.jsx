import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const contactsStart = [
  { id: 'id-1', name: 'Mike Tyson', number: '459-12-56' },
  { id: 'id-2', name: 'Michael Jordan', number: '443-89-12' },
  { id: 'id-3', name: 'Danny DeVito', number: '645-17-79' },
  { id: 'id-4', name: 'Arnold Schwarzenegger', number: '227-91-26' },
]
const App = () => {
 
  const [contacts, setContacts] = useState(()=>{
  const stringifyContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifyContacts)??contactsStart;
    return parsedContacts
})
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

 //Добавление нового контакта в список контактов
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prevState => 
      prevState = [{ id: nanoid(), ...contact }, ...prevState],
    );
  };

 

  // Изменение значения фильтра
  const changeFilter = event => {
    setFilter(prevState => prevState = event.target.value)
  };

  // Получение отфильтрованных контактов
  const getVisibleContacts = () => {
    
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
//Удаление контакта
  const removeContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };
 
    const visibleContacts = getVisibleContacts();
    
    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={addContact} />

        <SubTitle>Contacts</SubTitle>
        {contacts.length > 0 ? (
          // Фильтр для отображения контактов
          <Filter value={filter} onChangeFilter={changeFilter} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {contacts.length > 0 && (
          // Список контактов
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </Container>
    );
}

export default App;