#!/bin/bash

echo "🌟 Starting Toki Pona Learning App..."
echo ""
echo "pona tawa sina! (Welcome!)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if config has API key
if grep -q "YOUR_API_KEY_HERE" config.json; then
    echo ""
    echo "⚠️  WARNING: Gemini API key not configured!"
    echo ""
    echo "To use AI features:"
    echo "1. Get a free API key from https://ai.google.dev"
    echo "2. Add it in the app's Settings screen, OR"
    echo "3. Edit config.json and replace YOUR_API_KEY_HERE with your key"
    echo ""
    echo "The app will still work without an API key, but AI features will be disabled."
    echo ""
fi

echo "Starting app..."
npm start
