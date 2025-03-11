const fs = require("fs");
const path = require("path");

const getStateFilePath = (projectDir) => path.join(projectDir, ".dwarf", "state.json");

const stateManager = {
  /**
   * Saves the project state in the correct directory.
   * @param {Object} data - The state data to save.
   * @param {string} projectDir - The project directory.
   */
  saveState(data, projectDir) {
    try {
      const stateFilePath = getStateFilePath(projectDir);
      fs.mkdirSync(path.dirname(stateFilePath), { recursive: true }); // Ensure .dwarf folder exists
      fs.writeFileSync(stateFilePath, JSON.stringify(data, null, 2));
      console.log(`💾 State saved at: ${stateFilePath}`);
    } catch (error) {
      console.error("❌ Error saving state:", error);
    }
  },

  /**
   * Loads the project state from the correct directory.
   * @param {string} projectDir - The project directory.
   * @returns {Object} The loaded state.
   */
  loadState(projectDir) {
    try {
      const stateFilePath = getStateFilePath(projectDir);
      if (fs.existsSync(stateFilePath)) {
        console.log(`🔍 Loading state from ${stateFilePath}`);
        return JSON.parse(fs.readFileSync(stateFilePath));
      }
    } catch (error) {
      console.error("❌ Error loading state:", error);
    }

    console.log("⚠️ No saved state found.");
    return {};
  }
};

module.exports = stateManager;
