const {generateCode} = require("../utils/aiService");
const fileService = require("../utils/fileService");
const stateManager = require("../utils/stateManager");

async function modifyProject(input, techStack) {
  console.log(`\n🔄 Processing modification: "${input}"...\n`);

  const projectDir = process.cwd(); // Get current working directory
  const projectState = stateManager.loadState(projectDir);
  // console.log("📂 Loaded Project State:", projectState);


  if (!projectState) {
    console.error("❌ Error: No saved project state found!");
    return;
  }

  // Ask AI to modify code
  let response;
  try {
    response = await generateCode(`This is the previous response: ${projectState} - generate same structured response for ${input}`, techStack);
    if (!response || !response.paths || !response.code) {
      throw new Error("AI returned an incomplete response.");
    }
  } catch (error) {
    console.error("❌ AI failed to generate modifications:", error);
    return;
  }


  // console.log(response);

  // Update files
  await fileService.createFiles(response.paths, response.code);

  // Save new state
  stateManager.saveState(response, projectDir);

  console.log("\n✅ Modification applied successfully!");
}

module.exports = modifyProject;
