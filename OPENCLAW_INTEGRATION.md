# OpenClaw Integration Guide

**OpenClaw** (formerly Moltbot/Clawdbot) is an autonomous AI agent that runs locally and provides multi-channel messaging capabilities. This integration allows you to trigger AgentGPT autonomous agents from OpenClaw via WhatsApp, Telegram, Discord, iMessage, and other supported channels.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)

---

## Prerequisites

### 1. Install OpenClaw

**Node 22 or newer required**

**macOS/Linux:**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

### 2. Set Up OpenClaw

```bash
# Run onboarding wizard
openclaw onboard --install-daemon

# Check status
openclaw gateway status

# Launch dashboard
openclaw dashboard
```

### 3. AgentGPT Running

Ensure your AgentGPT instance is running and accessible:
```bash
npm run dev  # Development (http://localhost:3000)
# OR
npm run build && npm start  # Production
```

---

## Installation

### Step 1: Configure Environment Variables

Add to your `.env` file:

```bash
# Generate a secure token
openssl rand -hex 32

# Add to .env:
OPENCLAW_WEBHOOK_TOKEN=your_generated_token_here
OPENCLAW_GATEWAY_URL=http://localhost:8080
OPENAI_MODEL_NAME=gpt-3.5-turbo  # or gpt-4
OPENAI_API_KEY=sk-your-openai-key-here
```

### Step 2: Install the OpenClaw Skill (Optional)

If you want to use the pre-built skill configuration:

```bash
# Copy skill to OpenClaw skills directory
cp -r .openclaw/agentgpt-skill.json ~/.openclaw/skills/

# OR manually configure in OpenClaw dashboard
openclaw dashboard
# Navigate to Skills → Add Custom Skill
# Upload: .openclaw/agentgpt-skill.json
```

### Step 3: Configure Webhook in OpenClaw

In your OpenClaw configuration (typically `~/.openclaw/config.yaml`):

```yaml
skills:
  agentgpt:
    enabled: true
    webhook_url: "http://localhost:3000/api/openclaw/webhook"
    webhook_token: "your_generated_token_here"

channels:
  telegram:
    enabled: true
    skills: ["agentgpt"]
  discord:
    enabled: true
    skills: ["agentgpt"]
  # Add other channels as needed
```

### Step 4: Restart Services

```bash
# Restart OpenClaw gateway
openclaw gateway restart

# Ensure AgentGPT is running
npm run dev
```

---

## Configuration

### AgentGPT Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENCLAW_WEBHOOK_TOKEN` | Authentication token for webhook security | Yes | - |
| `OPENCLAW_GATEWAY_URL` | OpenClaw gateway URL (for sending responses) | No | `http://localhost:8080` |
| `OPENAI_MODEL_NAME` | OpenAI model to use | No | `gpt-3.5-turbo` |
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |

### OpenClaw Configuration

Edit `~/.openclaw/config.yaml`:

```yaml
gateway:
  port: 8080
  host: localhost

skills:
  agentgpt:
    enabled: true
    webhook_url: "${AGENTGPT_URL}/api/openclaw/webhook"
    webhook_token: "${OPENCLAW_WEBHOOK_TOKEN}"
    commands:
      - name: "agent"
        description: "Create autonomous AI agent"
      - name: "agent-status"
        description: "Check agent status"

channels:
  telegram:
    enabled: true
    token: "${TELEGRAM_BOT_TOKEN}"
    skills: ["agentgpt"]

  discord:
    enabled: true
    token: "${DISCORD_BOT_TOKEN}"
    skills: ["agentgpt"]

  whatsapp:
    enabled: false
    skills: ["agentgpt"]
```

---

## Usage

### Command Format

```
/agent "Agent Name" - Your goal description
```

### Examples

#### 1. Research Agent

**Telegram/Discord/WhatsApp:**
```
/agent "AI Research Bot" - Research the latest developments in large language models and summarize key findings
```

**Response:**
```
✅ Agent "AI Research Bot" created successfully with 3 tasks
Agent ID: cluid_abc123xyz

Tasks:
1. Search for recent papers on LLMs
2. Identify key developments
3. Summarize findings
```

#### 2. Task Planning Agent

```
/agent "Project Planner" - Break down a website redesign project into actionable tasks
```

#### 3. Code Analysis Agent

```
/agent "Security Analyzer" - Analyze security vulnerabilities in authentication systems
```

### Check Agent Status

```
/agent-status cluid_abc123xyz
```

**Response:**
```
📊 Agent Status: AI Research Bot
Goal: Research latest LLM developments
Progress: 2/3 tasks completed

Tasks:
✅ 1. Search for recent papers on LLMs
   Result: Found 15 papers from 2026...

✅ 2. Identify key developments
   Result: Key trends include...

⏳ 3. Summarize findings
   Status: In progress...
```

---

## API Reference

### POST `/api/openclaw/webhook`

Trigger an AgentGPT autonomous agent.

**Request Body:**
```json
{
  "message": "/agent \"Research Bot\" - Research quantum computing",
  "sender": "+15555550123",
  "channel": "telegram",
  "token": "your_webhook_token"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "agentId": "cluid_abc123",
  "message": "Agent \"Research Bot\" created successfully with 3 tasks",
  "tasks": [
    "Search for quantum computing research",
    "Analyze recent breakthroughs",
    "Summarize findings"
  ]
}
```

**Error Responses:**

- `401 Unauthorized`: Invalid webhook token
- `400 Bad Request`: Missing required fields or invalid format
- `500 Internal Server Error`: Server error

---

### GET `/api/openclaw/status`

Check agent execution status.

**Query Parameters:**
- `agentId` (required): Agent ID
- `token` (required): Webhook authentication token

**Request:**
```
GET /api/openclaw/status?agentId=cluid_abc123&token=your_webhook_token
```

**Response (200 OK):**
```json
{
  "success": true,
  "agent": {
    "id": "cluid_abc123",
    "name": "Research Bot",
    "goal": "Research quantum computing",
    "createdAt": "2026-02-12T10:30:00Z",
    "taskCount": 3,
    "completedTasks": 2,
    "tasks": [
      {
        "value": "Search for quantum computing research",
        "status": "completed",
        "info": "Found 20 recent papers..."
      },
      {
        "value": "Analyze recent breakthroughs",
        "status": "executing",
        "info": null
      },
      {
        "value": "Summarize findings",
        "status": "started",
        "info": null
      }
    ]
  }
}
```

---

## Troubleshooting

### Issue: "Unauthorized: Invalid webhook token"

**Solution:** Ensure the token in `.env` matches the token in OpenClaw config:

```bash
# Check AgentGPT .env
cat .env | grep OPENCLAW_WEBHOOK_TOKEN

# Check OpenClaw config
cat ~/.openclaw/config.yaml | grep webhook_token

# They must match!
```

### Issue: "Agent not responding"

**Check logs:**
```bash
# AgentGPT logs
npm run dev  # Check console output

# OpenClaw logs
openclaw logs --follow
```

### Issue: "Invalid command format"

Ensure proper syntax:
```
✅ Correct: /agent "Bot Name" - Goal description
❌ Wrong:   /agent Bot Name Goal description
❌ Wrong:   /agent "Bot Name" Goal description
```

### Issue: "Cannot connect to AgentGPT"

1. Verify AgentGPT is running:
   ```bash
   curl http://localhost:3000/api/health
   ```

2. Check firewall settings (if OpenClaw is remote)

3. Update `AGENTGPT_URL` in OpenClaw config if not localhost

### Issue: "Tasks not executing"

Check OpenAI API key and credits:
```bash
# Test OpenAI connection
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## Security Considerations

⚠️ **Important Security Notes:**

### 1. Webhook Token Security

- **Never commit tokens to git**
- Use strong tokens: `openssl rand -hex 32`
- Rotate tokens regularly
- Use environment variables only

### 2. Rate Limiting

Consider adding rate limiting to prevent abuse:

```typescript
// In webhook.ts
const RATE_LIMIT = 10; // requests per minute
const rateLimitMap = new Map<string, number[]>();
```

### 3. Input Validation

The webhook validates:
- Token authentication
- Command format
- Required fields

### 4. Network Security

For production deployments:
- Use HTTPS for webhook URLs
- Implement IP whitelisting
- Use VPN for internal services
- Enable CORS protection

### 5. Database Isolation

Webhook users are created with:
- Isolated email domain: `openclaw-{sender}@webhook.local`
- Role: `webhook` (for tracking)
- Separate from regular users

### 6. OpenClaw Risks

As noted by Palo Alto Networks, OpenClaw presents risks:
- Access to private data
- Exposure to untrusted content
- External communications capability
- Memory retention

**Mitigation:**
- Run OpenClaw in isolated environment
- Limit permissions and capabilities
- Monitor agent executions
- Review generated tasks before execution

---

## Advanced Configuration

### Custom Model Settings

Modify webhook handler to use different models per channel:

```typescript
// src/pages/api/openclaw/webhook.ts

const modelSettings: ModelSettings = {
  customModelName:
    channel === "telegram" ? "gpt-4" :
    channel === "discord" ? "gpt-3.5-turbo" :
    process.env.OPENAI_MODEL_NAME || "gpt-3.5-turbo",
  customTemperature: 0.7,
  customMaxLoops: channel === "telegram" ? 50 : 25,
};
```

### Multi-Language Support

Add language detection:

```typescript
const languageMap: Record<string, string> = {
  "es": "Spanish",
  "fr": "French",
  "de": "German",
  "en": "English",
};

const language = languageMap[detectedLang] || "en";
```

### Response Callbacks

Send results back to OpenClaw:

```typescript
import axios from "axios";

// After agent completes
await axios.post(`${process.env.OPENCLAW_GATEWAY_URL}/message/send`, {
  target: sender,
  message: `Agent "${agentName}" completed! Results: ...`,
  channel: channel,
});
```

---

## Examples in Different Channels

### Telegram

```
You: /agent "Market Analyzer" - Analyze current crypto market trends

AgentGPT Bot: ✅ Agent "Market Analyzer" created
Agent ID: cluid_xyz789
Tasks: 5 tasks queued

[2 minutes later]

AgentGPT Bot: 📊 Market Analyzer Update
Progress: 5/5 tasks completed
Summary: Bitcoin up 3%, Ethereum consolidating...
```

### Discord

```
@AgentGPT /agent "Meeting Scheduler" - Find best time for team meeting

AgentGPT: Agent created! 🎯
ID: cluid_abc456
Use `/agent-status cluid_abc456` to check progress
```

### WhatsApp

```
/agent "Travel Planner" - Plan 7-day Japan itinerary

✅ Agent created: Travel Planner
📋 8 tasks generated
🔗 View: https://your-agentgpt.com/agent/cluid_def123
```

---

## Integration with Claude Code

The rapid deployment setup (`.claude/`) includes OpenClaw support:

```bash
# Session hook automatically checks OpenClaw status
./.claude/hooks/session-start.sh

# Test OpenClaw webhook
curl -X POST http://localhost:3000/api/openclaw/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/agent \"Test\" - Test integration",
    "sender": "test@local",
    "token": "your_token"
  }'
```

---

## Resources

- **OpenClaw Docs:** https://docs.openclaw.ai
- **AgentGPT Repo:** https://github.com/reworkd/AgentGPT
- **OpenClaw Skills:** https://github.com/VoltAgent/awesome-openclaw-skills
- **Cloudflare Worker:** https://github.com/cloudflare/moltworker

---

## Support

For issues:
1. Check troubleshooting section above
2. Review OpenClaw logs: `openclaw logs`
3. Check AgentGPT console output
4. Open issue: https://github.com/reworkd/AgentGPT/issues

---

**Happy automating! 🤖🦞**
