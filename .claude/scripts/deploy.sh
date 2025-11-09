#!/bin/bash
# Automated deployment script for AgentGPT
# Runs all checks, commits, and pushes changes

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 AgentGPT Deployment Script${NC}"
echo "================================"
echo ""

# Check for uncommitted changes
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  No changes to deploy${NC}"
  exit 0
fi

# Step 1: Run pre-commit checks
echo -e "${BLUE}Step 1: Running pre-commit checks...${NC}"
if ./.claude/scripts/pre-commit-checks.sh; then
  echo -e "${GREEN}✅ Pre-commit checks passed${NC}"
else
  echo -e "${RED}❌ Pre-commit checks failed. Aborting deployment.${NC}"
  exit 1
fi

echo ""

# Step 2: Show what will be committed
echo -e "${BLUE}Step 2: Changes to be committed:${NC}"
git status --short
echo ""

# Step 3: Get commit message
echo -e "${BLUE}Step 3: Generating commit message...${NC}"
# This would be called by Claude to generate an appropriate message
# For now, we'll use a timestamp-based message
COMMIT_MSG="chore: automated deployment $(date '+%Y-%m-%d %H:%M:%S')"
echo "Commit message: $COMMIT_MSG"
echo ""

# Step 4: Commit changes
echo -e "${BLUE}Step 4: Committing changes...${NC}"
git add .
git commit -m "$COMMIT_MSG"
echo -e "${GREEN}✅ Changes committed${NC}"
echo ""

# Step 5: Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}Step 5: Pushing to branch: $BRANCH${NC}"

# Step 6: Push changes
if git push -u origin "$BRANCH"; then
  echo -e "${GREEN}✅ Successfully pushed to $BRANCH${NC}"
else
  echo -e "${RED}❌ Push failed${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Branch: $BRANCH"
echo "Commit: $(git rev-parse --short HEAD)"
echo ""
echo "Next steps:"
echo "  • Create a PR: gh pr create"
echo "  • View on GitHub: $(git remote get-url origin)"
echo "  • Deploy to Vercel: vercel --prod"
echo ""
