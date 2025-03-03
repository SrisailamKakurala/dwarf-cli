#!/usr/bin/env node

const { program } = require("commander");
const init = require("../lib/commands/init");

program
  .version("1.0.0")
  .command("init")
  .description("Initialize the project")
  .action(init);

program.parse(process.argv);
