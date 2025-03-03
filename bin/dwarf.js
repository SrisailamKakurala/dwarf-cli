#!/usr/bin/env node

import readline from "readline";
import generateProject from "../lib/commands/generateProject.js";
import modifyProject from "../lib/commands/modifyProject.js";
import exitShell from "../lib/commands/exitShell.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">>> ",
});

console.log("Welcome to Dwarf CLI 🛠️ Type 'dwarf forge' to start or 'exit' to quit.");
rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim().toLowerCase();

  if (input === "dwarf forge") {
    await generateProject(rl);
  } else if (input === "exit") {
    exitShell(rl);
  } else {
    await modifyProject(input);
  }

  rl.prompt();
});
