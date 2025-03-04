function exitShell(rl) {
    console.log("\n👋 Exiting Dwarf Shell. See you soon!\n");
    rl.close();
    process.exit(0);
  }
  
  module.exports = exitShell;
  