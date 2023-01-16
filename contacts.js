const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const getAllContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataString);

  return data;
};

const listContacts = async () => {
  const contactList = await getAllContacts();

  console.log(`Сontact list: `);
  console.table(contactList);
};

const getContactById = async (contactId) => {
  const contactList = await getAllContacts();
  const contact = contactList.find(({ id }) => id === contactId);

  console.log(`Contact with ID ${contactId}: `);
  console.table(contact);
};

const removeContact = async (contactId) => {
  const contactList = await getAllContacts();
  const index = contactList.findIndex(({ id }) => id === contactId);
  const deletedContact = contactList[index];

  if (index !== -1) {
    contactList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));

    console.log(
      `The contact with ID ${contactId} has been removed from the contact list: `
    );
    console.table(deletedContact);
  }
};

const addContact = async (name, email, phone) => {
  const contactList = await getAllContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contactList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactList));

  console.log(
    `A contact with the name ${name} has been added to the contacts list: `
  );
  console.table(newContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
