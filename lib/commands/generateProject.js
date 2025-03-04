const inquirer = require("inquirer").default; // Fix the inquirer issue
const chalk = require("chalk");
const clone = require("../utils/clone");
const { generateCode } = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");
const startShell = require("./startShell");

async function generateProject() {
  console.log(chalk.green.bold("\n⚒️  Welcome to Dwarf CLI! Let's forge your project. 🔥\n"));

  const Frontend = chalk.red("Frontend");
  const Backend = chalk.blue("Backend");
  const FullStack = chalk.yellow("Full Stack");

  // Step 1: Get project name
  const { projectName } = await inquirer.prompt([
    { 
      type: "input", 
      name: "projectName", 
      message: chalk.cyan.bold("🛠️  Enter your project name:"), 
      default: "my-project" 
    }
  ]);

  // Step 2: Select project type
  const { type } = await inquirer.prompt([
    { 
      type: "list", 
      name: "type", 
      message: chalk.magenta.bold("📌 Select project type:"), 
      choices: [Frontend, Backend, FullStack] 
    }
  ]);

  // Step 3: Select tech stack
  const { techStack } = await inquirer.prompt([
    { 
      type: "list", 
      name: "techStack", 
      message: chalk.blue.bold("🛠️  Choose a Tech Stack:"), 
      choices: ["ReactJs", "Angular", "HTML+CSS+JS", "Vue"] 
    }
  ]);

  // Step 4: What to forge?
  const { projectGoal } = await inquirer.prompt([
    { 
      type: "input", 
      name: "projectGoal", 
      message: chalk.yellow.bold("🔨 What do you want the dwarf to forge?"), 
      default: "A portfolio website" 
    }
  ]);

  console.log(chalk.green.bold("\n⏳ Forging your project... Please wait...\n"));

  // Step 5: Clone boilerplate with project name
  await clone(techStack, projectName);

  console.log(chalk.blue.bold("\n🤖 Generating AI-based project structure...\n"));

  // Step 6: Generate AI-based project structure
  const response = await generateCode(projectGoal, techStack);

  console.log(chalk.cyan.bold("\n📂 Creating project files...\n"));

  // Step 7: Create project files
  await fileService.executeStructure(response.srcDirStructure);
  await fileService.createFiles(response.paths, response.code);

  console.log(chalk.magenta.bold("\n💾 Saving project state...\n"));

  // Step 8: Save project state
  stateManager.saveState(response);

  console.log(chalk.yellow.bold("\n📦 Installing dependencies...\n"));

  // Step 9: Install dependencies
  await fileService.installDependencies(response.dependencies);

  console.log(chalk.green.bold("\n🚀 Project setup complete! 🎉\n"));

  // Step 10: Start interactive shell
  console.log(chalk.blue.bold("\n🔮 Entering the Dwarf Forge interactive shell...\n"));
  startShell();
}

generateProject();
