#!/bin/bash
# Pre-commit validation script for AgentGPT
# Runs linting, tests, and type checking before allowing commits

set -e

echo "🔍 Running pre-commit checks..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

CHECKS_PASSED=true

# Function to run a check
run_check() {
  local name=$1
  local command=$2

  echo "▶️  $name..."
  if eval "$command" > /tmp/check_output.log 2>&1; then
    echo -e "${GREEN}✅ $name passed${NC}"
    return 0
  else
    echo -e "${RED}❌ $name failed${NC}"
    cat /tmp/check_output.log
    CHECKS_PASSED=false
    return 1
  fi
}

# Lint check
run_check "ESLint" "npm run lint" || true

# Type check (if TypeScript compilation is part of build)
run_check "Build/Type Check" "npm run build" || true

# Tests
run_check "Jest Tests" "npm test -- --passWithNoTests" || true

echo ""
if [ "$CHECKS_PASSED" = true ]; then
  echo -e "${GREEN}✅ All checks passed! Safe to commit.${NC}"
  exit 0
else
  echo -e "${RED}❌ Some checks failed. Please fix before committing.${NC}"
  exit 1
fi
