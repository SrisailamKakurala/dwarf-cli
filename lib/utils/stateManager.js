const fs = require("fs");
const path = require("path");

const stateManager = {
  saveState(data, projectDir) {
    const stateFile = path.join(projectDir, ".dwarf", "state.json");

    // Ensure the .dwarf directory exists
    const stateDir = path.dirname(stateFile);
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }

    fs.writeFileSync(stateFile, JSON.stringify(data, null, 2));
    console.log(`💾 Project state saved in ${stateFile}`);
  },

  loadState(projectDir) {
    const stateFile = path.join(projectDir, ".dwarf", "state.json");

    if (fs.existsSync(stateFile)) {
      console.log(`🔍 Loading state from ${stateFile}`);
      return JSON.parse(fs.readFileSync(stateFile));
    }

    console.log("❌ No saved state found!");
    return {};
  }
};

module.exports = stateManager;
