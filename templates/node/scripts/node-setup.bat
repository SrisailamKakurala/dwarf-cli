@echo off
setlocal enabledelayedexpansion

:: Prompt for project name
set /p projectName="Enter project name (or '.' for current directory): "

:: Handle current directory case
if "%projectName%"=="." (
    echo Initializing Node.js project in the current directory...
    set "projectDir=%CD%"
) else (
    echo Creating project folder "%projectName%"...
    mkdir "%projectName%"
    set "projectDir=%CD%\%projectName%"
    cd "%projectName%" || exit /b 1
)

:: Initialize a new Node.js project
echo Initializing package.json...
call npm init -y

:: Install Express
echo Installing Express...
call npm install express

:: Sleep for 1 second to ensure installation completes
timeout /t 1 /nobreak >nul

:: Define correct mock server file path
set "mockServerPath=%~dp0\..\templates\node\scripts\__mock__\mock.server.js"
set "serverFilePath=%projectDir%\server.js"

:: Ensure the mock file exists before copying
if not exist "%mockServerPath%" (
    echo Error: templates/node/scripts/__mock__/mock.server.js not found!
    exit /b 1
)

:: Copy mock.server.js content to server.js
copy /Y "%mockServerPath%" "%serverFilePath%" >nul

:: Verify server.js exists before running
if not exist "%serverFilePath%" (
    echo Error: server.js was not created.
    exit /b 1
)

:: Start the server
echo Setup complete. Starting the development server...
node "%serverFilePath%"

endlocal
