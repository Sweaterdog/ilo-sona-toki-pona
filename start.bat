@echo off
title Toki Pona Learning App
echo ========================================
echo   Starting Toki Pona App...
echo ========================================
echo.

if not exist "node_modules" (
    echo ERROR: Dependencies not installed!
    echo.
    echo Please run install.bat first.
    echo.
    pause
    exit /b 1
)

echo Launching app...
echo.
call npm start

if errorlevel 1 (
    echo.
    echo ========================================
    echo   App closed with errors
    echo ========================================
    echo.
    pause
)
