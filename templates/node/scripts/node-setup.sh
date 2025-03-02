#!/bin/bash

# Prompt for project name
read -p "Enter project name (or '.' for current directory): " projectName

# Handle current directory case
if [ "$projectName" == "." ]; then
    echo "Initializing Express project in the current directory..."
else
    echo "Creating project folder '$projectName'..."
    mkdir -p "$projectName"
    cd "$projectName" || exit 1
fi

# Initialize a new Node.js project
echo "Initializing package.json..."
npm init -y

# Install Express
echo "Installing Express..."
npm install express

# Create server.js
echo "Creating server.js..."
cat > server.js <<EOL
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});
EOL

# Start the server
echo "Setup complete. Starting the development server..."
node server.js
