#!/bin/bash
# AgentGPT Session Start Hook
# Auto-runs when Claude Code starts a session

set -e

echo "🚀 Initializing AgentGPT development environment..."

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "⚠️  Warning: Node.js 18+ required (current: $(node -v))"
fi

# Install dependencies if node_modules missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed"
fi

# Ensure .env exists
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Remember to update .env with your actual API keys!"
  else
    echo "⚠️  Warning: No .env file found"
  fi
else
  echo "✅ .env file exists"
fi

# Check database
if [ ! -f "prisma/db.sqlite" ] && [ ! -f "db/db.sqlite" ]; then
  echo "🗄️  Initializing database..."
  npx prisma db push --skip-generate 2>/dev/null || echo "⚠️  Database setup may be needed"
else
  echo "✅ Database exists"
fi

# Show available commands
echo ""
echo "📋 Available npm scripts:"
echo "   npm run dev        - Start development server"
echo "   npm run build      - Build for production"
echo "   npm test           - Run tests"
echo "   npm run lint       - Lint code"
echo ""
echo "🔧 Claude Code slash commands:"
echo "   /deploy            - Deploy with pre-flight checks"
echo "   /test-and-build    - Run tests and build"
echo ""
echo "✨ Environment ready! Happy coding!"
