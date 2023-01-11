const fs = require("fs").promises;
const path = require("path");

// TODO: to analyze in detail the methods of the path module.
// const contactsPath = path.join(__dirname, 'contacts.json');
const contactsPath = path.join(__dirname, './db/contacts.json');

console.log('contactsPath', contactsPath);

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return data;
}

console.log(listContacts);

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

// // TODO: задокументировать каждую функцию
// function listContacts() {
//   // ...твой код
// }

// function getContactById(contactId) {
//   // ...твой код
// }

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }