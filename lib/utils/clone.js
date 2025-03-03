const degit = require("degit");

async function cloneRepo(techStack, projectName) {
  const repos = {
    ReactJs: "github-user/react-boilerplate",
    Vue: "github-user/vue-boilerplate",
  };

  const emitter = degit(repos[techStack], { force: true });
  await emitter.clone(projectName);
  console.log("Boilerplate cloned!");
}

module.exports = cloneRepo;