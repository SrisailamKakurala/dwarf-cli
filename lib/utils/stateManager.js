const fs = require('fs');

const stateFile = ".dwarf/state.json";

const stateManager = {
  saveState(data) {
    fs.writeFileSync(stateFile, JSON.stringify(data, null, 2));
  },

  loadState() {
    if (fs.existsSync(stateFile)) {
      console.log(`🔍 Loading state from ${stateFile}`);
      return JSON.parse(fs.readFileSync(stateFile));
    }
    console.log("❌ No saved state found!---------------");
    return {};
  }
};

module.exports = stateManager;
