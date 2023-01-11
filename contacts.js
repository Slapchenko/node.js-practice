const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const getAllContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataString);

  console.log(`Сontact list: `);
  console.table(data);

  return data;
};

const getContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const contact = allContacts.find((value) => value.id === contactId);

  console.log(`Contact with ID ${contactId}: `);
  console.table(contact);

  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex((value) => value.id === contactId);
  const deletedContact = allContacts[index];

  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));

    console.log(
      `The contact with ID ${contactId} has been removed from the contact list. Updated contact list: `
    );
    console.table(allContacts);
  }

  return deletedContact ? deletedContact : null;
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
    `A contact with the name ${name} has been added to the contacts list. Updated contact list: `
  );
  console.table(allContacts);
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};
