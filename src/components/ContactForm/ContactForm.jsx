import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Button, Input } from './ContactForm.styled';

const ContactForm = ({onSubmit}) => {

const [name, setName] = useState('')
const [number, setNumber] = useState('')
  // Генерация уникальных идентификаторов для полей формы
 let nameInputId = nanoid();
  let numberInputId = nanoid();

  // Обработка отправки формы
  const handleSubmit = event => {
    event.preventDefault();

    // Вызов функции onSubmit из родительского компонента с передачей объекта контакта
    onSubmit({ name, number });

    // Сброс состояния формы
    reset();
  };

 // Обработка изменения значений полей формы
  const handleChange = event => {
        const { name, value } = event.target;
  switch(name){
    case "name":{
      setName(value);
      return
    }
    case "number":{
      setNumber(value);
      return
    }
   default: return;
  }
}

  // Сброс состояния формы
 const  reset = () => {
    setNumber('')
    setName('')
  };

 
    return (
      <Form onSubmit={handleSubmit}>
        <Label htmlFor={nameInputId}>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label htmlFor={numberInputId}>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact </Button>
      </Form>
    );
}

export default ContactForm;

