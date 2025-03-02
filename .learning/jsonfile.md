## **📜 `jsonfile` Module in Node.js**  

The `jsonfile` package is a **simpler alternative to `fs`** for reading and writing JSON files. It **automatically parses JSON** and handles objects without manual `JSON.stringify()` or `JSON.parse()`.  

### **1️⃣ Install the `jsonfile` Package**
```sh
npm install jsonfile
```

### **2️⃣ Importing the Module**
```js
const jsonfile = require("jsonfile");
```

---

## **📌 Reading a JSON File**  
🔹 **Asynchronous (Recommended)**
```js
jsonfile.readFile("data.json", (err, obj) => {
  if (err) console.error("Error reading file:", err);
  else console.log("Data:", obj);
});
```

🔹 **Synchronous**
```js
const obj = jsonfile.readFileSync("data.json");
console.log("Data:", obj);
```

---

## **📌 Writing to a JSON File**  
🔹 **Asynchronous (Recommended)**
```js
const data = { name: "Dwarf", version: "1.0.0" };

jsonfile.writeFile("data.json", data, { spaces: 2 }, (err) => {
  if (err) console.error("Error writing file:", err);
  else console.log("File saved!");
});
```
🔹 **Synchronous**
```js
jsonfile.writeFileSync("data.json", data, { spaces: 2 });
console.log("File saved!");
```

---

## **📌 Updating a JSON File (Modify Existing Data)**
```js
jsonfile.readFile("data.json", (err, obj) => {
  if (err) console.error(err);
  else {
    obj.updatedAt = new Date().toISOString(); // Add new field

    jsonfile.writeFile("data.json", obj, { spaces: 2 }, (err) => {
      if (err) console.error("Error writing file:", err);
      else console.log("Data updated!");
    });
  }
});
```

---

## **📌 Deleting a Key from JSON**
```js
jsonfile.readFile("data.json", (err, obj) => {
  if (err) console.error(err);
  else {
    delete obj.version; // Remove the "version" key

    jsonfile.writeFile("data.json", obj, { spaces: 2 }, (err) => {
      if (err) console.error(err);
      else console.log("Key deleted!");
    });
  }
});
```

---

## **📌 Handling Errors**
Always **check for errors** when reading or writing JSON files:
```js
jsonfile.readFile("nonexistent.json", (err, obj) => {
  if (err) {
    console.error("File not found or invalid JSON:", err);
    return;
  }
  console.log(obj);
});
```

---

## **📌 Why Use `jsonfile` Instead of `fs`?**
✅ **Automatic Parsing:** No need for `JSON.stringify()` or `JSON.parse()`  
✅ **Simpler Syntax:** No need to handle encoding (`utf8`)  
✅ **Pretty-Print Support:** `spaces: 2` makes JSON human-readable  
✅ **Asynchronous & Synchronous Support**  

---

## **🚀 Example Use Case in a CLI Tool**
You can use `jsonfile` to **store user preferences, CLI tool configurations, or cached API responses.** Would you like a real-world example? 😊