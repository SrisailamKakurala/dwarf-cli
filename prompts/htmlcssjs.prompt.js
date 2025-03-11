const htmlPrompt = `
# HTML + CSS + JavaScript Boilerplate

Generate a **modern, responsive, and production-ready** HTML, CSS, and JavaScript project with the following:

## 🔹 **Requirements**
- HTML5 structure with semantic elements
- CSS with TailwindCSS for styling and responsiveness
- JavaScript for interactivity (ES6+)
- Modular JS structure with an organized **utils folder**
- A working **dark mode toggle**
- A simple **form validation** using JavaScript
- A **navigation bar** with smooth scrolling
- A **modal popup**
- A **responsive hero section**
- Footer with social media links
- Security best practices (e.g., no inline scripts)


example structure of project:
/
  /css
    styles.css         # Global styles
  /js
    script.js         # Main JS file
  /assets
    /images           # Images folder
  index.html          # Main HTML file


// ## **Response Structure:**
// The response should include the following files and their content: should be followed strictly
{
  "paths": {
    "index.html": "/index.html",
    "css/styles.css": "/css/styles.css",
    "js/script.js": "/js/script.js",
  },
  "code": {
    "index.html": "<!DOCTYPE html>\\n<html lang='en'>\\n<head>\\n<meta charset='UTF-8'>\\n<meta name='viewport' content='width=device-width, initial-scale=1.0'>\\n<title>My Web App</title>\\n<link rel='stylesheet' href='./css/styles.css'>\\n<script defer src='./js/script.js'></script>\\n</head>\\n<body>\\n<header>\\n<nav class='navbar'>\\n  <a href='#'>Home</a>\\n  <a href='#about'>About</a>\\n  <a href='#contact'>Contact</a>\\n  <button id='darkModeToggle'>Dark Mode</button>\\n</nav>\\n</header>\\n<section class='hero'>\\n  <h1>Welcome to My Website</h1>\\n  <button id='openModal'>Open Modal</button>\\n</section>\\n<div id='modal' class='hidden'>\\n  <div class='modal-content'>\\n    <p>This is a modal</p>\\n    <button id='closeModal'>Close</button>\\n  </div>\\n</div>\\n<footer>\\n  <p>© 2025 My Website</p>\\n</footer>\\n<script src='./js/darkMode.js'></script>\\n<script src='./js/modal.js'></script>\\n</body>\\n</html>",

    "css/styles.css": "body { font-family: Arial, sans-serif; margin: 0; padding: 0; }\\n.navbar { display: flex; gap: 15px; padding: 15px; background: #333; color: white; }\\n.hero { text-align: center; padding: 50px; }\\n.hidden { display: none; }\\n.modal-content { background: white; padding: 20px; border-radius: 5px; }",

    "js/script.js": "document.addEventListener('DOMContentLoaded', () => { console.log('JavaScript loaded!'); });",

  }
}
`;

module.exports = { htmlPrompt };