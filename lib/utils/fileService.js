const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const fileService = {
  async executeStructure(batCode, projectDir = process.cwd()) {
    // console.log("batcode: " + batCode);

    const batPath = path.join(projectDir, "structure.bat");

    // Ensure project directory exists
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // Write batch script inside the project directory
    fs.writeFileSync(batPath, `cd /d ${projectDir} \n` + batCode, "utf8");

    // Execute the batch script
    exec(`cmd /c "${batPath}"`, { cwd: projectDir }, (error) => {
      if (error) console.error("❌ Error executing batch:", error);
      fs.unlinkSync(batPath); // Cleanup
    });
  },

  async createFiles(paths, code, projectDir = process.cwd()) {
    for (const file in code) {
      if (paths[file] && code[file]) {
        const filePath = path.join(projectDir, paths[file]);

        try {
          // Ensure the directory exists before writing the file
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
          fs.writeFileSync(filePath, code[file], "utf8");
        } catch (err) {
          console.error(`❌ Error writing file ${filePath}:`, err);
        }
      } else {
        console.warn(`⚠️ Skipping file ${file} due to missing path or content.`);
      }
    }
  },

  async installDependencies(dependencies, projectDir = process.cwd()) {
    exec(dependencies, { cwd: projectDir }, (error) => {
      if (error) console.error("❌ Dependency installation failed:", error);
    });
  },
};

module.exports = fileService;
