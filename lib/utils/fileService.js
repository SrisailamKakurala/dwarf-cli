const fs = require("fs");
const path = require("path");

const fileService = {
  /**
   * Creates or overwrites files based on AI-generated response.
   * @param {Object} paths - Mapping of file names to their paths.
   * @param {Object} code - Mapping of file names to their content.
   * @param {string} [projectDir=process.cwd()] - Base project directory.
   */
  async createFiles(paths, code, projectDir = process.cwd()) {
    try {
      for (const file in code) {
        if (paths[file] && code[file]) {
          const filePath = path.join(projectDir, paths[file]);

          // Ensure directory exists
          await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

          // Check if file already exists
          const fileExists = fs.existsSync(filePath);
          if (fileExists) {
            console.log(`🔄 Overwriting: ${filePath}`);
          } else {
            console.log(`✅ Creating: ${filePath}`);
          }

          // Write or overwrite file content
          await fs.promises.writeFile(filePath, code[file], "utf8");
        }
      }
    } catch (error) {
      console.error("❌ Error writing files:", error);
    }
  },
};

module.exports = fileService;
