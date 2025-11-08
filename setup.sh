#!/bin/bash

# Toki Pona Learning App - Setup & Troubleshooting Script

echo "=================================="
echo "Toki Pona Learning App Setup"
echo "=================================="
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js found: $NODE_VERSION"
else
    echo "❌ Node.js not found!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm found: $NPM_VERSION"
else
    echo "❌ npm not found!"
    exit 1
fi

echo ""
echo "=================================="
echo "Checking Project Files"
echo "=================================="
echo ""

# Check required files
REQUIRED_FILES=(
    "main.js"
    "preload.js"
    "gemini-service.js"
    "index.html"
    "styles.css"
    "package.json"
    "config.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file is missing!"
    fi
done

# Check required directories
REQUIRED_DIRS=(
    "js"
    "data"
    "assets"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/"
    else
        echo "❌ $dir/ directory is missing!"
    fi
done

echo ""
echo "=================================="
echo "Checking Dependencies"
echo "=================================="
echo ""

if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
    
    # Check for key packages
    if [ -d "node_modules/electron" ]; then
        echo "✅ Electron installed"
    else
        echo "⚠️  Electron not found in node_modules"
    fi
    
    if [ -d "node_modules/@google" ]; then
        echo "✅ Google packages installed"
    else
        echo "⚠️  Google Generative AI not found"
    fi
else
    echo "⚠️  node_modules not found"
    echo "Run: npm install"
fi

echo ""
echo "=================================="
echo "Checking Configuration"
echo "=================================="
echo ""

if [ -f "config.json" ]; then
    if grep -q "YOUR_API_KEY_HERE" config.json; then
        echo "⚠️  Gemini API key not configured"
        echo ""
        echo "To set up AI features:"
        echo "1. Visit https://ai.google.dev"
        echo "2. Get a free API key"
        echo "3. Add it to config.json OR use the Settings screen in the app"
    else
        echo "✅ API key appears to be configured"
    fi
else
    echo "❌ config.json not found!"
fi

echo ""
echo "=================================="
echo "Quick Actions"
echo "=================================="
echo ""
echo "1. Install dependencies:    npm install"
echo "2. Start the app:           npm start"
echo "3. Development mode:        npm start -- --dev"
echo "4. Use launcher script:     ./start.sh"
echo ""

# Offer to install dependencies
if [ ! -d "node_modules" ]; then
    echo ""
    read -p "Install dependencies now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Installing dependencies..."
        npm install
        echo ""
        echo "✅ Dependencies installed!"
    fi
fi

# Offer to start the app
echo ""
read -p "Start the app now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -d "node_modules" ]; then
        echo ""
        echo "Starting Toki Pona Learning App..."
        echo "pona tawa sina! 🌟"
        echo ""
        npm start
    else
        echo "❌ Cannot start: Dependencies not installed"
        echo "Run: npm install"
    fi
fi

echo ""
echo "For more help, see:"
echo "- README.md (full documentation)"
echo "- QUICK_START.md (quick setup guide)"
echo "- PROJECT_SUMMARY.md (complete overview)"
echo ""
echo "pona tawa sina! (Good to you!)"
