const fs = require("fs");
const https = require("https");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "config.json");
const CONFIG_URL = "https://github.com/SrisailamKakurala/dwarf-cli/releases/latest/download/config.json";

/**
 * Fetches config.json from GitHub Releases and caches it locally.
 * @returns {Promise<Object>} The parsed config object.
 */
async function fetchConfig() {
    if (fs.existsSync(CONFIG_PATH)) {
        return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    }

    return new Promise((resolve, reject) => {
        https.get(CONFIG_URL, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                fs.writeFileSync(CONFIG_PATH, data, "utf-8");
                resolve(JSON.parse(data));
            });
        }).on("error", reject);
    });
}

module.exports = fetchConfig;
