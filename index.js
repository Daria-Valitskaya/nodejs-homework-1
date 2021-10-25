const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();
const { listContacts, addContact, getContactById } = require("./contacts");
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (!contactById) {
          console.log(chalk.red("contact not found"));
        }
        console.log(chalk.greenBright("contact found"));
        console.table(contactById);
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log(chalk.yellowBright("Add new contact"));
        console.table(contact);
        break;

      case "remove":
        // ... id
        break;

      default:
        console.warn(chalk.green("Unknown action type!"));
    }
  } catch (error) {
    console.error(chalk.red(error.message));
  }
}

invokeAction(argv);
