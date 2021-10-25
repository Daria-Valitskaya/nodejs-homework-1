const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const contactsPath = path.join(__dirname, "db", "contact.json");
// fs и его методы readFile() и writeFile()
async function readList() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}
async function listContacts() {
  return await readList();
}

async function getContactById(contactId) {
  const contacts = await readList();
  const result = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );
  return result;
}

async function removeContact(contactId) {
  const contacts = await readList();
  const result = contacts.reduce((newList, contact) => {
    if (String(contact.id) !== String(contactId)) {
      newList.push(contact);
    }
    return newList;
  }, []);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await readList();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
