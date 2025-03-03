import aiService from "../utils/aiService.js";
import fileService from "../utils/fileService.js";
import stateManager from "../utils/stateManager.js";

export default async function modifyProject(modification) {
  console.log(`\n🔧 Modifying project: ${modification}`);

  const state = stateManager.loadState();
  if (!state.paths) {
    console.error("❌ No existing project found.");
    return;
  }

  const response = await aiService.generateCode(`Modify project to: ${modification}`, state.techStack);
  await fileService.createFiles(response.paths, response.code);
  stateManager.saveState(response);

  console.log("✅ Modification applied!");
}
