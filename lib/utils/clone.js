const degit = require("degit");

async function clone(techStack, projectName) {
  const repos = {
    ReactJs: "srisailamkakurala/reactjs-boilerplate",
    Vue: "github-user/vue-boilerplate",
  };

  const emitter = degit(repos[techStack], { force: true });
  await emitter.clone(projectName);
  console.log("Boilerplate cloned! ✅");
}

module.exports = clone;