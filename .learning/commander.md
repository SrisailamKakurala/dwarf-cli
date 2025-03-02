### **Commander.js - Complete Guide (Basic to Advanced)** 🚀  
Commander.js is a popular **Node.js CLI framework** that simplifies command-line argument parsing, options handling, and subcommands.  

---

## **1️⃣ Installation**
Install globally or locally in your project:  

```sh
npm install commander
```

Import in your Node.js script:  

```js
const { Command } = require("commander");
const program = new Command();
```

---

## **2️⃣ Basic CLI Commands**
Creating a simple CLI command:  

```js
const { Command } = require("commander");
const program = new Command();

program
  .name("dwarf")
  .description("CLI tool for generating AI-powered boilerplate")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new project")
  .action(() => {
    console.log("Project initialized!");
  });

program.parse(process.argv);
```

Run in terminal:  

```sh
node cli.js init
```

---

## **3️⃣ Handling Arguments & Options**  

### **➡ Command Arguments**
Passing required & optional arguments:  

```js
program
  .command("greet <name> [age]")
  .description("Greet a user with name (required) and age (optional)")
  .action((name, age) => {
    console.log(`Hello, ${name}!`);
    if (age) console.log(`You are ${age} years old.`);
  });

program.parse(process.argv);
```

Run:  
```sh
node cli.js greet John 25
```

### **➡ Command Options (Flags)**
Adding options with default values:  

```js
program
  .command("create <project>")
  .description("Create a new project")
  .option("-t, --template <type>", "Specify project template", "react")
  .option("-f, --force", "Force project creation")
  .action((project, options) => {
    console.log(`Creating project: ${project}`);
    console.log(`Using template: ${options.template}`);
    if (options.force) console.log("Forcing creation...");
  });

program.parse(process.argv);
```

Run:  
```sh
node cli.js create myApp -t vue -f
```

---

## **4️⃣ Subcommands**
For a **modular CLI**, use subcommands:  

```js
const create = new Command("create")
  .description("Create a project")
  .action(() => {
    console.log("Project created!");
  });

const deleteCmd = new Command("delete")
  .description("Delete a project")
  .action(() => {
    console.log("Project deleted!");
  });

program.addCommand(create);
program.addCommand(deleteCmd);

program.parse(process.argv);
```

Run:  
```sh
node cli.js create
```

---

## **5️⃣ Handling Async Actions**
For async operations like calling an API:

```js
program
  .command("fetch <query>")
  .description("Fetch data from API")
  .action(async (query) => {
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await response.json();
    console.log("Data:", data);
  });

program.parse(process.argv);
```

---

## **6️⃣ Interactive CLI with Prompts**
Using `inquirer` for user input:

```js
const inquirer = require("inquirer");

program
  .command("setup")
  .description("Setup project")
  .action(async () => {
    const answers = await inquirer.prompt([
      { type: "input", name: "name", message: "Project Name?" },
      { type: "list", name: "template", choices: ["React", "Vue"], message: "Choose template:" },
    ]);

    console.log("Creating project:", answers.name, "with template:", answers.template);
  });

program.parse(process.argv);
```

---

## **7️⃣ Error Handling**
Handling invalid commands:

```js
program
  .command("start")
  .description("Start project")
  .action(() => {
    console.log("Project started!");
  });

program.on("command:*", (cmd) => {
  console.error(`Invalid command: ${cmd}`);
  program.outputHelp();
  process.exit(1);
});

program.parse(process.argv);
```

---

## **8️⃣ Custom Help & Output Formatting**
Customize the help menu:

```js
program
  .name("dwarf")
  .description("CLI tool for AI-powered project generation")
  .version("1.0.0")
  .helpOption("-h, --help", "Display help for command")
  .addHelpText(
    "after",
    `
Example Usage:
  dwarf init           Initialize a new project
  dwarf create myApp   Create a new project with default settings
  `
  );

program.parse(process.argv);
```

Run:  
```sh
node cli.js --help
```

---

## **9️⃣ Parsing Arguments Globally**
Instead of defining `parse(process.argv)` every time, use:  

```js
program.parse();
```
This automatically detects CLI arguments.

---

## **🔟 Packaging as an NPM CLI Tool**
Make it globally executable:  

1. **Update `package.json`:**
```json
"bin": {
  "dwarf": "./bin/dwarf.js"
}
```

2. **Add Shebang to `bin/dwarf.js`:**
```js
#!/usr/bin/env node
console.log("Dwarf CLI is running!");
```

3. **Link the CLI globally:**  
```sh
npm link
```

Now, run:  
```sh
dwarf init
```

---

## **🎯 Summary**
✅ **Basic CLI commands** (`.command()`, `.action()`)  
✅ **Arguments & Options** (`<args>`, `--flags`)  
✅ **Subcommands** (`addCommand()`)  
✅ **Async Operations** (`async/await`)  
✅ **Interactive Prompts** (`inquirer`)  
✅ **Custom Help & Error Handling**  
✅ **Packaging as an NPM CLI tool**  

This makes **Commander.js** a powerful tool for building scalable CLI applications! 🚀  

Would you like a sample **real-world CLI project** using this?