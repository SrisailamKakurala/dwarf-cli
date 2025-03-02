@echo off
setlocal enabledelayedexpansion

:: Ask for project name
set /p projectName="Enter project name (or '.' for current directory): "

:: Handle current directory case
if "%projectName%"=="." (
    echo Initializing React project in the current directory...
    call npx create-vite@latest . --template react --force
) else (
    echo Creating project folder "%projectName%"...
    mkdir "%projectName%" 2>nul
    cd "%projectName%" || exit /b
    call npx create-vite@latest . --template react --force
)

:: Ensure we're inside the correct directory before proceeding
if not "%projectName%"=="." (
    cd "%~dp0%projectName%" || exit /b
)

:: Wait for folder creation
timeout /t 2 /nobreak >nul

:: Verify directory exists before proceeding
if not exist package.json (
    echo ERROR: Project setup failed. Exiting...
    exit /b
)

:: Install dependencies
echo Installing dependencies...
call npm install || exit /b

:: Start the development server (runs in the same terminal)
echo Setup complete. Starting the development server...
call npm run dev

endlocal
