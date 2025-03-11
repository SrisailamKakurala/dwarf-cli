const { spawn } = require("child_process");
const inquirer = require("inquirer").default;
const chalk = require("chalk");
const path = require("path");
const clone = require("../utils/clone");
const { generateCode } = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");

/**
 * Runs a shell command asynchronously
 */
async function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { cwd, stdio: "inherit", shell: true });

    process.on("close", (code) => {
      if (code !== 0) {
        console.error(chalk.red(`\n❌ Command "${command} ${args.join(" ")}" failed. Exiting...\n`));
        reject(new Error(`Command failed with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Installs required dependencies based on tech stack
 */
async function installDependencies(projectDir, techStack) {
  console.log(chalk.green.bold("\n📦 Installing dependencies...\n"));

  let installCmd = "npm";
  let installArgs = ["install", "--legacy-peer-deps"];

  if (["Next.js", "React", "Node.js + Express"].includes(techStack)) {
    console.log(chalk.cyan("Installing production dependencies..."));
    await runCommand(installCmd, installArgs, projectDir);
  }

  if (["Next.js", "React"].includes(techStack)) {
    console.log(chalk.cyan("\nInstalling development dependencies..."));
    await runCommand(installCmd, ["install", "--only=dev", "--legacy-peer-deps"], projectDir);
  }
}

/**
 * Starts the project based on the selected tech stack
 */
async function startProject(projectDir, techStack) {
  console.log(chalk.green("\n🚀 Starting the project...\n"));

  let startCommand = "npm";
  let startArgs = [];

  switch (techStack) {
    case "Next.js":
      startArgs = ["run", "dev"];
      break;
    case "React":
      startArgs = ["start"];
      break;
    case "Node.js + Express":
      startArgs = ["run", "start"];
      break;
    case "HTML + CSS + JS":
      console.log(chalk.green("\n🎉 Your static website is ready! Open index.html in your browser.\n"));
      return;
    default:
      console.error(chalk.red("\n❌ Unknown tech stack. Exiting...\n"));
      return;
  }

  await runCommand(startCommand, startArgs, projectDir);
}

/**
 * Main function to generate a project using AI-based structure
 */
async function generateProject() {
  console.log(chalk.green.bold("\n⚒️  Welcome to Dwarf CLI! Let's forge your project. 🔥\n"));

  // Step 1: Ask for project name
  const { projectName } = await inquirer.prompt([
    { type: "input", name: "projectName", message: chalk.cyan.bold("🛠️  Enter your project name:"), default: "my-project" }
  ]);

  const projectDir = projectName === "." ? process.cwd() : path.join(process.cwd(), projectName);

  // Step 2: Choose tech stack
  const { techStack } = await inquirer.prompt([
    { 
      type: "list", 
      name: "techStack", 
      message: chalk.blue.bold("🛠️  Choose a Tech Stack:"), 
      choices: ["ReactJS", "Node.js + Express", "Next.js", "HTML + CSS + JS"] 
    }
  ]);

  // Step 3: Define project goal
  const { projectGoal } = await inquirer.prompt([
    { type: "input", name: "projectGoal", message: chalk.yellow.bold("🔨 What do you want the dwarf to forge?"), default: "A portfolio website" }
  ]);

  console.log(chalk.green.bold("\n⏳ Forging your project... Please wait...\n"));

  // Clone Template if applicable
  if (techStack == "ReactJS") {
    console.log('first')
    console.log(techStack, projectName);
    await clone(techStack, projectName);
  }

  // Step 4: Generate AI-based project structure
  console.log(chalk.blue.bold("\n🤖 Generating AI-based project structure...\n"));

  let response;
  try {
    const aiGenerated = await generateCode(`Generate a JSON output with keys 'paths' and 'code' for a ${techStack} project focused on ${projectGoal}. Ensure valid JSON formatting.`, techStack);
    
    console.log("🔍 AI Response:", aiGenerated); // Debugging

    response = JSON.parse(aiGenerated);
  } catch (error) {
    console.error(chalk.red.bold("\n❌ Error: Failed to parse AI-generated project structure.\n"));
    console.error(error);
    console.log(chalk.yellow("\n⚠️ Using fallback template...\n"));
  }

  if (!response || !response.paths || !response.code) {
    console.error(chalk.red.bold("\n❌ Error: Incomplete AI response. Exiting...\n"));
    return;
  }

  // Step 5: Create project files
  console.log(chalk.cyan.bold("\n📂 Creating project files...\n"));
  await fileService.createFiles(response.paths, response.code, projectDir);

  // Step 6: Save project state
  console.log(chalk.magenta.bold("\n💾 Saving project state...\n"));
  stateManager.saveState(response, projectDir);

  // Step 7: Install dependencies (if applicable)
  try {
    await installDependencies(projectDir, techStack);
  } catch {
    console.error(chalk.red.bold("\n❌ Project setup failed. Exiting...\n"));
    return;
  }

  // Step 8: Start the project
  await startProject(projectDir, techStack);
}

// generateProject();

module.exports = generateProject;