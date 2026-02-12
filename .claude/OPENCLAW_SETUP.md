# 🦞 OpenClaw Quick Setup for AgentGPT

Quick guide to integrate OpenClaw (formerly Moltbot) with AgentGPT for multi-channel autonomous agents.

---

## ⚡ Quick Start

### 1. Install OpenClaw

```bash
# macOS/Linux
curl -fsSL https://openclaw.ai/install.sh | bash

# Windows PowerShell
iwr -useb https://openclaw.ai/install.ps1 | iex

# Run onboarding
openclaw onboard --install-daemon
```

### 2. Configure AgentGPT

```bash
# Generate webhook token
openssl rand -hex 32

# Add to .env:
OPENCLAW_WEBHOOK_TOKEN=your_token_here
OPENAI_API_KEY=sk-your-key-here
```

### 3. Start Services

```bash
# Terminal 1: AgentGPT
npm run dev

# Terminal 2: OpenClaw
openclaw gateway start
```

### 4. Test Integration

```bash
# Send test webhook
curl -X POST http://localhost:3000/api/openclaw/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/agent \"Test Bot\" - Test the integration",
    "sender": "test@local",
    "token": "your_token_here"
  }'
```

---

## 🎯 Usage from OpenClaw Channels

### Telegram/Discord/WhatsApp

```
/agent "Research Bot" - Research latest AI developments
```

**Response:**
```
✅ Agent "Research Bot" created with 3 tasks
Agent ID: cluid_abc123
```

### Check Status

```
/agent-status cluid_abc123
```

---

## 📁 Files Created

```
AgentGPT/
├── .env.example                         # Updated with OpenClaw vars
├── .openclaw/
│   └── agentgpt-skill.json              # OpenClaw skill definition
├── src/pages/api/openclaw/
│   ├── webhook.ts                       # Receives OpenClaw commands
│   └── status.ts                        # Agent status endpoint
└── OPENCLAW_INTEGRATION.md              # Full documentation
```

---

## 🔧 Configuration

### AgentGPT Environment (.env)

```bash
OPENCLAW_WEBHOOK_TOKEN=your_secure_token
OPENCLAW_GATEWAY_URL=http://localhost:8080
OPENAI_MODEL_NAME=gpt-3.5-turbo
OPENAI_API_KEY=sk-your-key
```

### OpenClaw Config (~/.openclaw/config.yaml)

```yaml
skills:
  agentgpt:
    enabled: true
    webhook_url: "http://localhost:3000/api/openclaw/webhook"
    webhook_token: "your_secure_token"

channels:
  telegram:
    enabled: true
    skills: ["agentgpt"]
  discord:
    enabled: true
    skills: ["agentgpt"]
```

---

## 📚 Full Documentation

See **[OPENCLAW_INTEGRATION.md](../OPENCLAW_INTEGRATION.md)** for:
- Complete setup guide
- API reference
- Security considerations
- Troubleshooting
- Advanced configuration
- Multi-language support
- Response callbacks

---

## 🔒 Security Checklist

- [ ] Strong webhook token generated
- [ ] Token stored in `.env` (not committed)
- [ ] HTTPS enabled for production
- [ ] Rate limiting considered
- [ ] OpenClaw running in isolated environment
- [ ] Agent execution monitoring enabled

---

## 🚀 Rapid Deployment Integration

OpenClaw works seamlessly with the rapid deployment setup:

```bash
# Session hook checks OpenClaw status
./.claude/hooks/session-start.sh

# Deploy with OpenClaw support
/deploy

# Test and build with OpenClaw integration
/test-and-build
```

---

## 🎨 Example Use Cases

### 1. Multi-Channel Customer Support
```
Telegram → AgentGPT → Autonomous support agent
```

### 2. Research Assistant
```
WhatsApp → AgentGPT → Research and summarize topics
```

### 3. Task Automation
```
Discord → AgentGPT → Break down projects into tasks
```

### 4. Code Analysis
```
Any channel → AgentGPT → Security audits, code review
```

---

## 📊 Architecture

```
┌─────────────────┐
│ Telegram/       │
│ Discord/        │
│ WhatsApp        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   OpenClaw      │ ← Multi-channel gateway
│   Gateway       │
└────────┬────────┘
         │
         │ HTTP POST /api/openclaw/webhook
         ↓
┌─────────────────┐
│   AgentGPT      │ ← Autonomous agent engine
│   API           │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Database      │ ← Agent & task storage
│   (Prisma)      │
└─────────────────┘
```

---

## 🆘 Quick Troubleshooting

**Issue:** "Unauthorized" error
```bash
# Verify tokens match
grep OPENCLAW_WEBHOOK_TOKEN .env
grep webhook_token ~/.openclaw/config.yaml
```

**Issue:** Agent not responding
```bash
# Check services
curl http://localhost:3000/api/health
openclaw gateway status
```

**Issue:** Invalid command format
```bash
# Correct syntax
/agent "Name" - Goal description
```

---

## 🔗 Resources

- **OpenClaw Docs:** https://docs.openclaw.ai
- **AgentGPT Integration:** [OPENCLAW_INTEGRATION.md](../OPENCLAW_INTEGRATION.md)
- **Awesome Skills:** https://github.com/VoltAgent/awesome-openclaw-skills
- **Security Info:** https://research.aimultiple.com/moltbot/

---

**Ready to automate across all your messaging platforms! 🤖📱**
