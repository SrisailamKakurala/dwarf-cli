#!/usr/bin/env node

const { program } = require("commander");
const generateProject = require("../lib/commands/generateProject");

program
  .command("forge")
  .description("Create a new project and start an interactive shell")
  .action(() => {
    generateProject();
  });

program.parse(process.argv);
