@echo off
echo ========================================
echo   Toki Pona App - Installer
echo ========================================
echo.
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found!
node --version
echo.
echo Installing dependencies...
echo This may take a few minutes...
echo.

call npm install
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo.
    pause
    exit /b 1
)

echo.
echo Installing Gemini AI SDK...
call npm install @google/generative-ai
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install Gemini SDK!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo You can now run the app by double-clicking:
echo   start.bat          (normal mode)
echo   start-dev.bat      (development mode with DevTools)
echo.
echo Don't forget to add your Gemini API key in Settings!
echo Get one free at: https://ai.google.dev
echo.
pause
