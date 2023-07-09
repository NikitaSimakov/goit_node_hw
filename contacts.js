import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

export const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactById = data.find((contact) => contact.id === contactId);
  return contactById || null;
};

export const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((contact) => contact.id === contactId);
  const [removeData] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  if (contactIndex === -1) return null;
  return removeData;
};

export const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  return newContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
