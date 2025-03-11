const { spawn } = require("child_process");
const inquirer = require("inquirer").default;
const chalk = require("chalk");
const clone = require("../utils/clone");
const { generateCode } = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");
const startShell = require("./startShell");
const path = require("path");

async function startProject(projectDir) {
  console.log(chalk.green.bold("\n📦 Installing dependencies and starting the project...\n"));

  return new Promise((resolve, reject) => {
    // 🌟 Install dependencies
    const installProcess = spawn("npm", ["install"], { cwd: projectDir, stdio: "inherit", shell: true });

    installProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(chalk.red("\n❌ Failed to install dependencies. Exiting...\n"));
        reject();
        return;
      }

      console.log(chalk.green.bold("\n🚀 Starting the project...\n"));

      // 🌟 Start Vite in a child process (no stdin)
      const startProcess = spawn("npm", ["run", "dev"], {
        cwd: projectDir,
        shell: true,
        stdio: ["ignore", "inherit", "inherit"], // No stdin (prevents blocking)
      });

      // 🌟 After 5 seconds, start the shell in the parent process
      setTimeout(() => {
        console.log(chalk.blue.bold("\n🔮 Entering the Dwarf Forge interactive shell...\n"));
        startShell(); // Start shell in parent process
      }, 5000);

      // 🌟 Handle cleanup (Ctrl+C)
      const cleanup = () => {
        console.log(chalk.red.bold("\n❌ Stopping project..."));
        if (startProcess) startProcess.kill("SIGINT");
        process.exit(0);
      };

      process.on("SIGINT", cleanup);
      process.on("SIGTERM", cleanup);

      startProcess.on("close", (code) => {
        if (code !== 0) {
          console.error(chalk.red("\n❌ Failed to start the project. Exiting...\n"));
          reject();
        } else {
          resolve();
        }
      });
    });
  });
}

async function generateProject() {
  console.log(chalk.green.bold("\n⚒️  Welcome to Dwarf CLI! Let's forge your project. 🔥\n"));

  const { projectName } = await inquirer.prompt([
    { type: "input", name: "projectName", message: chalk.cyan.bold("🛠️  Enter your project name:"), default: "my-project" }
  ]);

  const projectDir = projectName === "." ? process.cwd() : path.join(process.cwd(), projectName);

  const { techStack } = await inquirer.prompt([
    { type: "list", name: "techStack", message: chalk.blue.bold("🛠️  Choose a Tech Stack:"), choices: ["ReactJs", "Angular", "HTML+CSS+JS", "Vue"] }
  ]);

  const { projectGoal } = await inquirer.prompt([
    { type: "input", name: "projectGoal", message: chalk.yellow.bold("🔨 What do you want the dwarf to forge?"), default: "A portfolio website" }
  ]);

  console.log(chalk.green.bold("\n⏳ Forging your project... Please wait...\n"));

  if (projectName !== ".") {
    await clone(techStack, projectName);
  }

  console.log(chalk.blue.bold("\n🤖 Generating AI-based project structure...\n"));

  let response;
  try {
    const aiGenerated = await generateCode(projectGoal, techStack);
    response = JSON.parse(aiGenerated);
  } catch (error) {
    console.error(chalk.red.bold("\n❌ Error: Failed to parse AI-generated project structure.\n"));
    console.error(error);
    return;
  }

  if (!response || !response.paths || !response.code) {
    console.error(chalk.red.bold("\n❌ Error: Incomplete AI response. Check the response structure.\n"));
    return;
  }

  console.log(chalk.cyan.bold("\n📂 Creating project files...\n"));

  await fileService.createFiles(response.paths, response.code, projectDir);

  console.log(chalk.magenta.bold("\n💾 Saving project state...\n"));
  stateManager.saveState(response, projectDir);

  console.log(chalk.yellow.bold("\n📦 Installing dependencies...\n"));

  try {
    await startProject(projectDir);
  } catch {
    console.error(chalk.red.bold("\n❌ Project setup failed. Exiting...\n"));
    return;
  }
}

// generateProject();

module.exports = generateProject;
