const fs = require('fs');
const { exec } = require('child_process');

const fileService = {
  async executeStructure(batCode) {
    fs.writeFileSync("structure.bat", batCode);
    exec("structure.bat", (error) => {
      if (error) console.error("❌ Error executing batch:", error);
      fs.unlinkSync("structure.bat"); // Cleanup
    });
  },

  async createFiles(paths, code) {
    for (const file in code) {
      fs.writeFileSync(paths[file], code[file]);
    }
  },

  async installDependencies(dependencies) {
    exec(dependencies, (error) => {
      if (error) console.error("❌ Dependency installation failed:", error);
    });
  }
};

module.exports = fileService;
