### **Child Process in Node.js (Complete Guide)** 🚀  

The `child_process` module in Node.js allows us to **run external system commands**, **spawn new processes**, and **execute shell scripts** from our Node.js applications.  

---

## **1️⃣ Importing Child Process Module**
```js
const { exec, execSync, spawn, fork } = require("child_process");
```
Each method serves different purposes, which we'll explore below.  

---

## **2️⃣ `exec()` – Execute Shell Commands (Simple)**
Used for running **shell commands** and capturing their output as a string.

```js
const { exec } = require("child_process");

exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Output:\n${stdout}`);
});
```
✅ Runs shell commands  
✅ Captures output  
✅ Buffer-based (returns everything at once)  

**Use Case:** Running shell commands like `ls`, `mkdir`, `git pull`, etc.

---

## **3️⃣ `execSync()` – Synchronous Version of exec()**
Blocks execution until the command completes.

```js
const { execSync } = require("child_process");

try {
  const output = execSync("ls -la").toString();
  console.log(`Output:\n${output}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
```
✅ **Blocking execution** (use carefully!)  
✅ Useful for scripts where order matters  

**Use Case:** When commands **must complete before** proceeding.

---

## **4️⃣ `spawn()` – Streaming Large Data**
Instead of returning output as a buffer, `spawn()` streams **real-time output**.

```js
const { spawn } = require("child_process");

const process = spawn("ls", ["-la"]); // Runs "ls -la"

process.stdout.on("data", (data) => {
  console.log(`Output: ${data}`);
});

process.stderr.on("data", (data) => {
  console.error(`Error: ${data}`);
});

process.on("close", (code) => {
  console.log(`Process exited with code: ${code}`);
});
```
✅ **Streams output (useful for large data)**  
✅ Non-blocking  
✅ Best for **real-time logging**  

**Use Case:** Running **long-running processes** like servers, npm installs, and background scripts.

---

## **5️⃣ `spawnSync()` – Synchronous Version of spawn()**
Blocks execution until the command completes.

```js
const { spawnSync } = require("child_process");

const process = spawnSync("ls", ["-la"]);
console.log(`Output:\n${process.stdout.toString()}`);
```

✅ **Blocking execution**  
✅ Best for **scripts that must run sequentially**  

---

## **6️⃣ `fork()` – Create Child Node.js Process**
Used to **spawn another Node.js script** as a separate process.

**child.js**:
```js
process.on("message", (msg) => {
  console.log(`Child received: ${msg}`);
  process.send("Hello from child!");
});
```

**parent.js**:
```js
const { fork } = require("child_process");

const child = fork("./child.js");

child.send("Hello from parent!");

child.on("message", (msg) => {
  console.log(`Parent received: ${msg}`);
});
```
✅ **Inter-process communication (IPC)**  
✅ Runs another Node.js file as a child process  
✅ Ideal for **parallel task execution**  

**Use Case:** Running **background tasks** without blocking the main process.

---

## **7️⃣ Running a `.bat` File Using Child Process**
You can execute a `.bat` script in Windows:

```js
const { exec } = require("child_process");

exec("cmd.exe /c myscript.bat", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
```
✅ Runs batch scripts inside Node.js  
✅ Can automate tasks like **installing dependencies, setting up environments**  

---

## **8️⃣ Killing a Child Process**
```js
const { spawn } = require("child_process");

const process = spawn("ping", ["google.com"]);

setTimeout(() => {
  process.kill(); // Stops the process
  console.log("Process killed!");
}, 5000);
```
✅ Prevents runaway processes  
✅ Useful for **timeout-based execution**  

---

## **🎯 Summary**
✅ **`exec()`** → Runs shell commands (buffers output)  
✅ **`execSync()`** → Synchronous version of `exec()`  
✅ **`spawn()`** → Streams output (best for real-time processes)  
✅ **`spawnSync()`** → Synchronous version of `spawn()`  
✅ **`fork()`** → Runs a child Node.js script with IPC  
✅ **Killing processes** → `.kill()` method  

Would you like a **real-world CLI example** using `child_process`? 🚀