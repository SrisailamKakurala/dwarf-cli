const aiService = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");

async function modifyProject(input) {
  console.log(`\n🔄 Processing modification: "${input}"...\n`);

  // Get current project state
  const projectState = stateManager.getState();

  // Ask AI to modify code
  const response = await aiService.modifyCode(input, projectState);

  // Update files
  await fileService.createFiles(response.paths, response.code);

  // Save new state
  stateManager.saveState(response);

  console.log("\n✅ Modification applied successfully!");
}

module.exports = modifyProject;
