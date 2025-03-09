const fetch = require("node-fetch");

async function fetchConfig() {
  try {
    const response = await fetch("https://dwarf-server-production.up.railway.app/api-key", {
      headers: { Authorization: `Bearer cegmfnijotnfmnijotngec` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch API key.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("❌ Error fetching API key:", error);
    process.exit(1);
  }
}

module.exports = fetchConfig;
