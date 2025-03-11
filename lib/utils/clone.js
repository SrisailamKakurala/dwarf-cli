const fs = require("fs");
const path = require("path");
const degit = require("degit");

async function clone(techStack, projectName) {
  const repos = {
    ReactJS: "srisailamkakurala/reactjs-boilerplate",
    Vue: "github-user/vue-boilerplate",
  };

  const targetDir = projectName === "." ? process.cwd() : path.resolve(process.cwd(), projectName);

  // Ensure the target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`\n🚀 Cloning ${techStack} boilerplate into ${targetDir}...\n`);

  const emitter = degit(repos[techStack], { force: true });

  try {
    await emitter.clone(targetDir);
    console.log("✅ Boilerplate cloned successfully!");
  } catch (error) {
    console.error("❌ Error cloning repository:", error);
    process.exit(1);
  }
}

module.exports = clone;
