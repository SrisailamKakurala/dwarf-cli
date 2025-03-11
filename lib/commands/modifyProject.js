const {generateCode} = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");

async function modifyProject(input) {
  console.log(`\n🔄 Processing modification: "${input}"...\n`);

  // Load project state correctly
  const projectState = stateManager.loadState();

  if (!projectState.paths || !projectState.code) {
    console.error("❌ Error: No saved project state found!");
    return;
  }

  // Ask AI to modify code
  const response = await generateCode(input, projectState);

  // console.log(response);

  // Update files
  await fileService.createFiles(response.paths, response.code);

  // Save new state
  stateManager.saveState(response);

  console.log("\n✅ Modification applied successfully!");
}

module.exports = modifyProject;
