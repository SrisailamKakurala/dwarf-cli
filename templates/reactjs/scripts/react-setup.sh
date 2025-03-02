#!/bin/bash

# Prompt for project name
read -p "Enter project name (or '.' for current directory): " projectName

# Handle current directory case
if [ "$projectName" == "." ]; then
    echo "Initializing React project in the current directory..."
    npx create-vite@latest . --template react --force
else
    echo "Creating project folder '$projectName'..."
    mkdir -p "$projectName"
    cd "$projectName" || exit 1
    npx create-vite@latest . --template react --force
fi

# Ensure we're inside the correct directory before proceeding
if [ "$projectName" != "." ]; then
    cd "$projectName" || exit 1
fi

# Wait for folder creation
sleep 2

# Verify package.json exists before proceeding
if [ ! -f package.json ]; then
    echo "ERROR: Project setup failed. Exiting..."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install || exit 1

# Start the development server (runs in the same terminal)
echo "Setup complete. Starting the development server..."
npm run dev
