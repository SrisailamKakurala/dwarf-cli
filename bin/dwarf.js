#! /usr/bin/env node
const { spawn } = require("child_process");

const args = process.argv.slice(2);

if (args[0] === "forge") {
  require("./forge")();
} else {
  console.log("Unknown command. Try 'dwarf forge'");
}
