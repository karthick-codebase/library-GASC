#!/bin/bash
# Quick setup script for GitHub and Render deployment
# Run this script before pushing to GitHub

echo "======================================"
echo "Library GASC - Setup Script"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Running linter..."
npm run lint:fix

echo ""
echo "Building project..."
npm run build

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Add remote: git remote add origin https://github.com/karthick-codebase/library-GASC.git"
echo "2. Add files: git add ."
echo "3. Commit: git commit -m 'Initial commit: Library Management System'"
echo "4. Push: git push -u origin main"
echo ""
echo "For detailed deployment instructions, see GITHUB_RENDER_SETUP.md"
