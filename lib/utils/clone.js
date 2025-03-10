const fs = require("fs");
const path = require("path");
const degit = require("degit");

async function clone(techStack, projectName) {
  const repos = {
    ReactJs: "srisailamkakurala/reactjs-boilerplate",
    Vue: "github-user/vue-boilerplate",
  };

  const targetDir = projectName === "." ? process.cwd() : path.resolve(projectName);

  // Ensure the directory exists if not "."
  if (projectName !== "." && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const emitter = degit(repos[techStack], { force: true });

  await emitter.clone(targetDir);
  console.log("Boilerplate cloned! ✅");
}

module.exports = clone;
