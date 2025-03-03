const inquirer = require("inquirer");

async function forge() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Select project type:",
      choices: ["Frontend", "Backend", "Full Stack"],
    },
  ]);

  const { techStack } = await inquirer.prompt([
    {
      type: "list",
      name: "techStack",
      message: "Select technology stack:",
      choices: ["ReactJs", "Angular", "HTML+CSS+JS", "Vue"],
    },
  ]);

  console.log(`Selected: ${type} with ${techStack}`);
}

module.exports = forge;
