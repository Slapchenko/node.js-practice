const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);

  console.log(`Сontact list: `);
  console.table(allContacts);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const contact = contactList.find(({ id }) => id === contactId);

  console.log(`Contact with ID ${contactId}: `);
  console.table(contact);
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
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
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
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
