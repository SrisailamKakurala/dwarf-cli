## **File System (`fs`) & Path (`path`) Modules in Node.js** 🚀  

The `fs` (File System) module helps in handling files, and the `path` module simplifies file path manipulations.  

---

## **1️⃣ Importing Modules**  
```js
const fs = require("fs");
const path = require("path");
```

---

# **📁 `fs` (File System) Module**
Used for **reading, writing, updating, deleting files, and working with directories.**  

---

## **2️⃣ Reading Files**
🔹 **Asynchronous (Non-blocking)**  
```js
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});
```

🔹 **Synchronous (Blocking)**  
```js
const data = fs.readFileSync("example.txt", "utf8");
console.log("File content:", data);
```

---

## **3️⃣ Writing Files**
🔹 **Asynchronous (Recommended)**
```js
fs.writeFile("example.txt", "Hello, world!", (err) => {
  if (err) throw err;
  console.log("File written successfully!");
});
```

🔹 **Synchronous**
```js
fs.writeFileSync("example.txt", "Hello, world!");
console.log("File written successfully!");
```

🔹 **Appending Data**
```js
fs.appendFile("example.txt", "\nNew Line!", (err) => {
  if (err) throw err;
  console.log("Data appended!");
});
```

---

## **4️⃣ Deleting Files**
```js
fs.unlink("example.txt", (err) => {
  if (err) throw err;
  console.log("File deleted!");
});
```

---

## **5️⃣ Working with Directories**
🔹 **Create a Directory**
```js
fs.mkdir("newFolder", (err) => {
  if (err) throw err;
  console.log("Folder created!");
});
```

🔹 **Remove a Directory**
```js
fs.rmdir("newFolder", (err) => {
  if (err) throw err;
  console.log("Folder removed!");
});
```

🔹 **Read Directory Contents**
```js
fs.readdir(".", (err, files) => {
  if (err) throw err;
  console.log("Files in directory:", files);
});
```

---

## **6️⃣ Checking if a File Exists**
```js
if (fs.existsSync("example.txt")) {
  console.log("File exists!");
} else {
  console.log("File does not exist!");
}
```

---

# **📌 `path` Module**
Used for handling file paths **across different operating systems**.

---

## **7️⃣ Joining Paths**
```js
const filePath = path.join(__dirname, "folder", "file.txt");
console.log(filePath); // Outputs: /absolute/path/folder/file.txt
```

---

## **8️⃣ Extracting File Information**
```js
const file = "/user/local/index.html";

console.log(path.basename(file)); // index.html
console.log(path.extname(file));  // .html
console.log(path.dirname(file));  // /user/local
```

---

## **9️⃣ Absolute vs Relative Paths**
```js
const absolutePath = path.resolve("folder", "file.txt");
console.log(absolutePath); // Full absolute path

console.log(__dirname); // Directory of the current file
console.log(__filename); // Full path of the current file
```

---

## **🔹 Summary**
✅ `fs` for **file operations** (read, write, delete, directories)  
✅ `path` for **manipulating file paths**  
✅ Works across **all operating systems**  

Would you like a **real-world CLI example** using `fs` and `path`? 🚀