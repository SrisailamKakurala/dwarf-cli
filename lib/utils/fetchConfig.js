const axios = require("axios");

async function fetchConfig() {
  try {
    const response = await axios.get("https://dwarf-server-production.up.railway.app/api-key", {
      headers: { Authorization: `Bearer cegmfnijotnfmnijotngec` },
    });

    // console.log("🔍 API Response Data:", response.data); // Debugging

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("❌ Error fetching API key:", error.message);
    process.exit(1);
  }
}

module.exports = fetchConfig;
