const { spawn } = require("child_process");
const inquirer = require("inquirer").default;
const chalk = require("chalk");
const clone = require("../utils/clone");
const { generateCode } = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");
const startShell = require("./startShell");
const path = require("path");

async function startProject(projectDir, techStack) {
  console.log(chalk.green.bold("\n📦 Installing dependencies and starting the project...\n"));

  return new Promise((resolve, reject) => {
    // 🌟 Install production dependencies with --legacy-peer-deps flag to handle dependency conflicts
    console.log(chalk.cyan("Installing production dependencies..."));
    const installProcess = spawn("npm", ["install", "--legacy-peer-deps"], { 
      cwd: projectDir, 
      stdio: "inherit", 
      shell: true 
    });

    installProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(chalk.red("\n❌ Failed to install production dependencies. Exiting...\n"));
        reject();
        return;
      }

      // 🌟 Install dev dependencies with --legacy-peer-deps flag
      console.log(chalk.cyan("\nInstalling development dependencies..."));
      const devInstallProcess = spawn("npm", ["install", "--only=dev", "--legacy-peer-deps"], { 
        cwd: projectDir, 
        stdio: "inherit", 
        shell: true 
      });

      devInstallProcess.on("close", (devCode) => {
        if (devCode !== 0) {
          console.error(chalk.yellow("\n⚠️ Warning: Failed to install some dev dependencies, but continuing..."));
        }

        // Determine start command based on techStack
        let startCommand = "npm";
        let startArgs = ["run", "dev"];
        let serverDescription = "development server";
        
        // For Express/Node.js projects, use direct node command
        if (techStack && (techStack.toLowerCase().includes("express") || techStack.toLowerCase().includes("node"))) {
          startCommand = "node";
          startArgs = ["server.js"];
          serverDescription = "Express server";
        }

        console.log(chalk.green.bold(`\n🚀 Starting the ${serverDescription}...\n`));

        // 🌟 Start server process
        const startProcess = spawn(startCommand, startArgs, {
          cwd: projectDir,
          shell: true,
          stdio: ["ignore", "inherit", "inherit"], // No stdin (prevents blocking)
        });

        // 🌟 After server starts, show API information
        setTimeout(() => {
          if (techStack && (techStack.toLowerCase().includes("express") || techStack.toLowerCase().includes("node"))) {
            console.log(chalk.blue.bold("\n🔮 Express server running!"));
            console.log(chalk.cyan("  • API URL: ") + chalk.yellow("http://localhost:3000/api"));
            console.log(chalk.cyan("  • API Documentation: ") + chalk.yellow("http://localhost:3000/api-docs"));
          } else {
            console.log(chalk.blue.bold(`\n🔮 ${serverDescription.charAt(0).toUpperCase() + serverDescription.slice(1)} running!`));
          }
          
          console.log(chalk.blue.bold("\n🔮 Entering the Dwarf Forge interactive shell...\n"));
          startShell(); // Start shell in parent process
        }, 3000);

        // 🌟 Handle cleanup (Ctrl+C)
        const cleanup = () => {
          console.log(chalk.red.bold(`\n❌ Stopping ${serverDescription}...`));
          if (startProcess) startProcess.kill("SIGINT");
          process.exit(0);
        };

        process.on("SIGINT", cleanup);
        process.on("SIGTERM", cleanup);

        startProcess.on("close", (code) => {
          if (code !== 0) {
            console.error(chalk.red(`\n❌ Failed to start the ${serverDescription}. Exiting...\n`));
            reject();
          } else {
            resolve();
          }
        });
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
    { type: "list", name: "techStack", message: chalk.blue.bold("🛠️  Choose a Tech Stack:"), choices: ["ReactJs", "ExpressJs", "Flask", "HTML+CSS+JS"] }
  ]);

  const { projectGoal } = await inquirer.prompt([
    { type: "input", name: "projectGoal", message: chalk.yellow.bold("🔨 What do you want the dwarf to forge?"), default: "A portfolio website" }
  ]);

  console.log(chalk.green.bold("\n⏳ Forging your project... Please wait...\n"));

  if (techStack == "ReactJs") {
    await clone(techStack, projectName);
  }
  
  console.log(chalk.blue.bold("\n🤖 Generating AI-based project structure...\n"));

  let response;
  try {
    const aiGenerated = await generateCode(projectGoal, techStack);
    console.log(aiGenerated);
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
    await startProject(projectDir, techStack);
  } catch {
    console.error(chalk.red.bold("\n❌ Project setup failed. Exiting...\n"));
    return;
  }
}

generateProject();

// module.exports = generateProject;
