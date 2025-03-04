const readline = require("readline");
const modifyProject = require("./modifyProject");
const exitShell = require("./exitShell");

function startShell() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "dwarf> ",
  });

  console.log("\n🔨 Interactive Shell Started! Type commands to modify your project.");
  console.log("Type 'exit' to quit.\n");

  rl.prompt();

  rl.on("line", async (line) => {
    const input = line.trim().toLowerCase();

    if (input === "exit") {
      exitShell(rl);
    } else {
      await modifyProject(input);
    }

    rl.prompt();
  });
}

module.exports = startShell;
