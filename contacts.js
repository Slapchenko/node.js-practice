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
  const allContacts = await getAllContacts();

  console.log(`Сontact list: `);
  console.table(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const contact = allContacts.find(({ id }) => id === contactId);

  console.log(`Contact with ID ${contactId}: `);
  console.table(contact);
};

const removeContact = async (contactId) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  const deletedContact = allContacts[index];

  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));

    console.log(
      `The contact with ID ${contactId} has been removed from the contact list: `
    );
    console.table(deletedContact);
  }
};

const addContact = async (name, email, phone) => {
  const allContacts = await getAllContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

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
