@echo off
setlocal


:: Create core folders
mkdir bin
mkdir lib
mkdir templates
mkdir templates\react
mkdir templates\vue
mkdir templates\angular
mkdir scripts
mkdir .dwarf

:: Create essential files
echo #!/usr/bin/env node > bin\dwarf.js
echo module.exports = {}; > lib\init.js
echo module.exports = {}; > lib\makeProject.js
echo module.exports = {}; > lib\fileGenerator.js
echo module.exports = {}; > lib\stateManager.js
echo module.exports = {}; > lib\contentGenerator.js
echo {} > .dwarf\state.json
echo {} > .dwarf\paths.json
echo {} > .dwarf\content.json
echo @echo off > scripts\generate.bat
echo {^} > package.json
echo # dwarf-cli > README.md
echo node_modules/ > .gitignore

:: Success message
echo Folder structure for %PROJECT_NAME% created successfully!
endlocal
