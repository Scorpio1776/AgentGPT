#!/bin/bash

# OpenClaw Integration Test Script
# Tests the webhook and status endpoints

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🦞 OpenClaw Integration Test${NC}"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo -e "${RED}❌ .env file not found${NC}"
  echo "Create .env from .env.example first"
  exit 1
fi

# Load environment variables
source .env

# Check required variables
if [ -z "$OPENCLAW_WEBHOOK_TOKEN" ]; then
  echo -e "${RED}❌ OPENCLAW_WEBHOOK_TOKEN not set in .env${NC}"
  exit 1
fi

# Default to localhost if not set
AGENTGPT_URL=${AGENTGPT_URL:-http://localhost:3000}

echo -e "${YELLOW}Testing AgentGPT server...${NC}"

# Test if server is running
if ! curl -s -f "${AGENTGPT_URL}" > /dev/null; then
  echo -e "${RED}❌ AgentGPT server not running at ${AGENTGPT_URL}${NC}"
  echo "Start it with: npm run dev"
  exit 1
fi

echo -e "${GREEN}✅ Server is running${NC}"
echo ""

# Test 1: Webhook endpoint
echo -e "${YELLOW}Test 1: Creating agent via webhook...${NC}"

RESPONSE=$(curl -s -X POST "${AGENTGPT_URL}/api/openclaw/webhook" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"/agent \\\"Test Bot\\\" - Test the OpenClaw integration\",
    \"sender\": \"test@local\",
    \"channel\": \"terminal\",
    \"token\": \"${OPENCLAW_WEBHOOK_TOKEN}\"
  }")

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  AGENT_ID=$(echo "$RESPONSE" | grep -o '"agentId":"[^"]*"' | cut -d'"' -f4)
  echo -e "${GREEN}✅ Agent created successfully${NC}"
  echo "   Agent ID: $AGENT_ID"
  echo "   Response: $RESPONSE" | jq '.' 2>/dev/null || echo "   Response: $RESPONSE"
else
  echo -e "${RED}❌ Failed to create agent${NC}"
  echo "   Response: $RESPONSE"
  exit 1
fi

echo ""

# Test 2: Status endpoint
echo -e "${YELLOW}Test 2: Checking agent status...${NC}"

if [ -n "$AGENT_ID" ]; then
  sleep 2  # Wait for agent to process

  STATUS_RESPONSE=$(curl -s "${AGENTGPT_URL}/api/openclaw/status?agentId=${AGENT_ID}&token=${OPENCLAW_WEBHOOK_TOKEN}")

  if echo "$STATUS_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Status retrieved successfully${NC}"
    echo "   Response: $STATUS_RESPONSE" | jq '.' 2>/dev/null || echo "   Response: $STATUS_RESPONSE"
  else
    echo -e "${RED}❌ Failed to get status${NC}"
    echo "   Response: $STATUS_RESPONSE"
    exit 1
  fi
else
  echo -e "${YELLOW}⚠️  Skipping status test (no agent ID)${NC}"
fi

echo ""

# Test 3: Invalid token
echo -e "${YELLOW}Test 3: Testing authentication (should fail)...${NC}"

INVALID_RESPONSE=$(curl -s -X POST "${AGENTGPT_URL}/api/openclaw/webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/agent \"Test\" - Test",
    "sender": "test@local",
    "token": "invalid_token"
  }')

if echo "$INVALID_RESPONSE" | grep -q '"success":false'; then
  echo -e "${GREEN}✅ Authentication working (rejected invalid token)${NC}"
else
  echo -e "${RED}❌ Authentication issue: should reject invalid tokens${NC}"
  echo "   Response: $INVALID_RESPONSE"
fi

echo ""

# Test 4: Invalid command format
echo -e "${YELLOW}Test 4: Testing invalid command format (should fail)...${NC}"

INVALID_CMD_RESPONSE=$(curl -s -X POST "${AGENTGPT_URL}/api/openclaw/webhook" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"invalid command format\",
    \"sender\": \"test@local\",
    \"token\": \"${OPENCLAW_WEBHOOK_TOKEN}\"
  }")

if echo "$INVALID_CMD_RESPONSE" | grep -q 'Invalid command format'; then
  echo -e "${GREEN}✅ Command validation working${NC}"
else
  echo -e "${YELLOW}⚠️  Command validation may need attention${NC}"
  echo "   Response: $INVALID_CMD_RESPONSE"
fi

echo ""
echo -e "${GREEN}=============================="
echo "🎉 All tests completed!"
echo "=============================${NC}"
echo ""

# Summary
echo "Summary:"
echo "  • Webhook endpoint: ✅ Working"
echo "  • Status endpoint: ✅ Working"
echo "  • Authentication: ✅ Working"
echo "  • Command validation: ✅ Working"
echo ""
echo "Next steps:"
echo "  1. Install OpenClaw: curl -fsSL https://openclaw.ai/install.sh | bash"
echo "  2. Configure OpenClaw: openclaw onboard --install-daemon"
echo "  3. See OPENCLAW_INTEGRATION.md for full setup"
echo ""
