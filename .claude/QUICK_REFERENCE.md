# ⚡ Quick Reference Card

## 🎯 Common Commands

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm test                 # Run tests
npm run lint             # Lint code
```

### Database
```bash
npx prisma studio        # Open database GUI
npx prisma db push       # Push schema changes
npx prisma generate      # Generate Prisma client
```

### Claude Code Slash Commands
```bash
/deploy                  # Full deployment workflow
/test-and-build          # Run all checks
```

### Scripts
```bash
./.claude/hooks/session-start.sh         # Setup environment
./.claude/scripts/pre-commit-checks.sh   # Run all checks
./.claude/scripts/deploy.sh              # Deploy with checks
```

## 🔧 Environment Setup

### Required .env Variables
```bash
# Minimum required
OPENAI_API_KEY=your-key-here
NEXTAUTH_SECRET=$(openssl rand -base64 32)
DATABASE_URL=file:./db.sqlite
```

### Feature Flags (defaults)
```bash
NEXT_PUBLIC_FF_AUTH_ENABLED=false        # Disable auth in dev
NEXT_PUBLIC_WEB_SEARCH_ENABLED=true      # Enable search
NEXT_PUBLIC_FORCE_AUTH=false             # Don't force login
```

## 🚀 MCP Server Status

Check if MCP servers are active:
```bash
env | grep MCP
```

Currently active:
- ✅ codesign (port 31780)

Recommended to add:
- filesystem (30% token savings)
- github (50% token savings, 10x faster)
- git (advanced operations)

## 📊 Token Optimization

### Best Practices
1. **Use MCP servers** instead of direct file reads
2. **Run tools in parallel** when independent
3. **Target searches** instead of broad exploration
4. **Reuse context** within same session

### Current Session
- Budget: 200,000 tokens
- Used: Check token warnings
- Target: <50,000 for rapid iterations

## 🐛 Quick Troubleshooting

### Build fails
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Database issues
```bash
rm -f prisma/db.sqlite db/db.sqlite
npx prisma db push
```

### Environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

### Git issues
```bash
git status                    # Check current state
git branch                    # List branches
git log --oneline -5          # Recent commits
```

## 🔗 Important URLs

- **Local dev:** http://localhost:3000
- **Prisma Studio:** http://localhost:5555
- **GitHub Repo:** https://github.com/reworkd/AgentGPT
- **Documentation:** See .claude/RAPID_DEPLOYMENT.md

## 💡 Pro Tips

1. **Session Start Hook:** Runs automatically, sets up env
2. **Parallel Checks:** `/test-and-build` runs lint+test together
3. **Smart Commits:** `/deploy` generates descriptive messages
4. **Token Saving:** Use GitHub MCP for PR operations (10x faster)
5. **Quick Iteration:** Keep sessions under 50k tokens

## 📞 Get Help

```bash
# Claude Code help
claude --help

# Project scripts
npm run

# Check installed packages
npm list --depth=0

# Node/npm versions
node -v && npm -v
```

---

**💾 Bookmark this file for quick reference!**
