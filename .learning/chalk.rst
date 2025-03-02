## **🎨 `chalk` Module in Node.js**  
`chalk` is a popular Node.js package used to **style terminal output with colors and text formatting**. It helps make CLI tools more readable and visually appealing.  

---

## **1️⃣ Install `chalk`**  
```sh
npm install chalk
```

---

## **2️⃣ Import & Use `chalk`**
```js
const chalk = require("chalk");

console.log(chalk.green("Success!"));
console.log(chalk.red("Error: Something went wrong!"));
console.log(chalk.blue.bold("Info: Processing..."));
```

---

## **📌 Basic Styling Methods**  
| Style | Example |
|--------|--------------------------------|
| **Text Color** | `chalk.red("Red Text")` |
| **Background Color** | `chalk.bgGreen("Green Background")` |
| **Bold** | `chalk.bold("Bold Text")` |
| **Italic** | `chalk.italic("Italic Text")` |
| **Underline** | `chalk.underline("Underlined Text")` |
| **Strikethrough** | `chalk.strikethrough("Strikethrough Text")` |

---

## **📌 Combining Styles**
🔹 **Chaining Styles**
```js
console.log(chalk.red.bold.underline("Error: Critical failure!"));
console.log(chalk.bgYellow.black(" Warning: Low battery! "));
```

🔹 **Multiple Styles in One Line**
```js
console.log(chalk.blue("Processing...") + chalk.green(" Done!"));
```

---

## **📌 Using Template Literals**
```js
console.log(`${chalk.magenta("Hello")} ${chalk.cyan("World")}`);
```

---

## **📌 Nested Chalk Styles**
```js
console.log(chalk.red(`An ${chalk.bold("important")} message!`));
```

---

## **📌 Custom Themes (Chalk Template Literals)**
You can define **custom themes** using template literals:
```js
const error = chalk.bold.red;
const warning = chalk.hex("#FFA500"); // Orange color using HEX
const success = chalk.greenBright;

console.log(error("Error: Something went wrong!"));
console.log(warning("Warning: Check your input!"));
console.log(success("Success: Task completed!"));
```

---

## **📌 Conditional Coloring Example**
```js
const status = "error";

console.log(
  status === "success"
    ? chalk.green("✔ Operation successful!")
    : chalk.red("✖ Operation failed!")
);
```

---

## **📌 Real-World CLI Example**
Use `chalk` with `commander` for **better CLI feedback**:
```js
const { program } = require("commander");

program
  .command("greet <name>")
  .description("Greet a user")
  .action((name) => {
    console.log(chalk.green(`Hello, ${name}!`));
  });

program.parse(process.argv);
```

---

## **🎯 Why Use `chalk`?**
✅ **No dependencies** (since Chalk v5)  
✅ **Simple & Readable syntax**  
✅ **Works with both CommonJS (`require`) & ESM (`import`)**  
✅ **Great for CLI projects**  

Would you like an example integrating `chalk` into our CLI tool? 🚀