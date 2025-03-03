import fs from "fs";

const stateFile = ".dwarf/state.json";

const stateManager = {
  saveState(data) {
    fs.writeFileSync(stateFile, JSON.stringify(data, null, 2));
  },

  loadState() {
    if (fs.existsSync(stateFile)) {
      return JSON.parse(fs.readFileSync(stateFile));
    }
    return {};
  }
};

export default stateManager;
