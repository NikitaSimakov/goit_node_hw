import fs from "fs/promises";
import { nanoid } from "nanoid";

import path from "path";

export const contactsPath = path.resolve("db", "contacts.json");

const writeData = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contactById = data.find((contact) => contact.id === contactId);
    return contactById || null;
  } catch (error) {
    console.error(error);
  }
};

export const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const contactIndex = data.findIndex((contact) => contact.id === contactId);
    const [removeData] = data.splice(contactIndex, 1);
    writeData(data);
    if (contactIndex === -1) return null;
    return removeData;
  } catch (error) {
    console.error(error);
  }
};

export const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  try {
    const data = await listContacts();
    data.push(newContact);
    writeData(data);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
