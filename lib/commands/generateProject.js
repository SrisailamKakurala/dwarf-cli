import cloneRepo from "../utils/clone.js";
import aiService from "../utils/aiService.js";
import fileService from "../utils/fileService.js";
import stateManager from "../utils/stateManager.js";
import inquirer from "inquirer";

export default async function generateProject(rl) {
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
      message: "Select Tech Stack:",
      choices: ["ReactJs", "Angular", "HTML+CSS+JS", "Vue"],
    },
  ]);

  const { projectGoal } = await inquirer.prompt([
    {
      type: "input",
      name: "projectGoal",
      message: "What do you want the dwarf to forge for you?",
      default: "A portfolio website for a software engineer",
    },
  ]);

  console.log("\n⏳ Setting up your project...");

  // Clone boilerplate
  await cloneRepo(techStack, projectGoal);

  // Generate structure & code using AI
  const response = await aiService.generateCode(projectGoal, techStack);
  
  // Execute batch file to create structure
  await fileService.executeStructure(response.srcDirStructure);
  
  // Generate & write files
  await fileService.createFiles(response.paths, response.code);

  // Save project state
  stateManager.saveState(response);

  // Install dependencies
  await fileService.installDependencies(response.dependencies);

  console.log("\n🚀 Project setup complete!");
}
