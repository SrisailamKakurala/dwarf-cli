const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const fileService = {
  async executeStructure(batCode, projectDir = process.cwd()) {
    try {
      const batPath = path.join(projectDir, "structure.bat");

      await fs.promises.mkdir(projectDir, { recursive: true });
      await fs.promises.writeFile(batPath, batCode, "utf8");

      execSync(`cmd /c "${batPath}"`, { cwd: projectDir, stdio: "inherit" });

      await fs.promises.unlink(batPath);
    } catch (error) {
      console.error("❌ Error executing batch script:", error);
    }
  },

  async createFiles(paths, code, projectDir = process.cwd()) {
    try {
      for (const file in code) {
        if (paths[file] && code[file]) {
          const filePath = path.join(projectDir, paths[file]);

          await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

          await fs.promises.writeFile(filePath, code[file], "utf8");
          console.log(`✅ Created: ${filePath}`);
        }
      }
    } catch (error) {
      console.error("❌ Error writing files:", error);
    }
  }
};

module.exports = fileService;
