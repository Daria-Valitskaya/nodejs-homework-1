const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
// const contactsPath =
// fs и его методы readFile() и writeFile()
function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};