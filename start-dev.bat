@echo off
title Toki Pona Learning App (Development Mode)
echo ========================================
echo   Starting Toki Pona App (DEV MODE)
echo ========================================
echo.
echo This will open the app with Developer Tools
echo for debugging and console output.
echo.

if not exist "node_modules" (
    echo ERROR: Dependencies not installed!
    echo.
    echo Please run install.bat first.
    echo.
    pause
    exit /b 1
)

echo Launching app with DevTools...
echo.
call npm start -- --dev

if errorlevel 1 (
    echo.
    echo ========================================
    echo   App closed with errors
    echo ========================================
    echo.
    pause
)
