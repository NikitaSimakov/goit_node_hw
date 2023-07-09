import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

console.log("Hello!");
console.log("My frineds");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-p, --phone <type>", "user phone")
  .option("-e, --email <type", "user email");

program.parse();
const option = program.opts();
// console.log(option);

const invokeAction = async ({ action, id, name, phone, email }) => {
  switch (action) {
    case "list":
      const list = await listContacts();
      return console.log(list);
    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);
    case "add":
      const newContact = await addContact({ name, phone, email });
      return console.log(newContact);
    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// console.log(
//   await addContact({
// name: "Serhii",
// phone: "123-23-12",
// email: "serhii@mail.com",
//   })
// );
// invokeAction({
//   action: "remove",
//   id: "1",
// });
invokeAction(option);
