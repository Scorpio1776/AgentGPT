# .claude Directory

This directory contains Claude Code configuration, hooks, and automation scripts for rapid development.

## 📁 Directory Structure

```
.claude/
├── README.md                      # This file
├── RAPID_DEPLOYMENT.md            # Complete deployment guide
├── QUICK_REFERENCE.md             # Quick command reference
├── mcp-config-template.json       # MCP server configuration template
├── commands/                      # Slash commands
│   ├── deploy.md                  # /deploy command
│   └── test-and-build.md          # /test-and-build command
├── hooks/                         # Automation hooks
│   └── session-start.sh           # Auto-runs on session start
└── scripts/                       # Utility scripts
    ├── pre-commit-checks.sh       # Quality checks
    └── deploy.sh                  # Deployment automation
```

## 🚀 Quick Start

### 1. First Time Setup

```bash
# Make scripts executable
chmod +x .claude/hooks/session-start.sh
chmod +x .claude/scripts/*.sh

# Run session start hook
./.claude/hooks/session-start.sh
```

### 2. Configure MCP Servers (Optional but Recommended)

Follow the guide in `RAPID_DEPLOYMENT.md` to set up MCP servers for:
- 🚀 10x faster GitHub operations
- 💾 90% token savings on file operations
- ⚡ 3x faster git operations

### 3. Use Slash Commands

```bash
/deploy              # Full deployment with checks
/test-and-build      # Run quality checks
```

## 📚 Documentation

- **[RAPID_DEPLOYMENT.md](./RAPID_DEPLOYMENT.md)** - Complete setup guide with MCP configuration
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick command cheat sheet

## 🔧 Customization

### Add Custom Slash Commands

Create a new file in `commands/`:

```markdown
---
description: Your command description
---

Your prompt for Claude to execute
```

**Example:** `commands/custom-deploy.md`

### Modify Session Start Hook

Edit `hooks/session-start.sh` to customize:
- Environment checks
- Dependency installation
- Database setup
- Welcome messages

## 🎯 Available Commands

### Slash Commands (use in Claude Code)
- `/deploy` - Complete deployment workflow
- `/test-and-build` - Run linting, tests, and build

### Shell Scripts (run in terminal)
- `.claude/hooks/session-start.sh` - Initialize environment
- `.claude/scripts/pre-commit-checks.sh` - Validate code quality
- `.claude/scripts/deploy.sh` - Automated deployment

## 💡 Best Practices

1. **Always run session-start hook** when starting work
2. **Use /test-and-build** before committing
3. **Use /deploy** for production deployments
4. **Set up MCP servers** for optimal performance
5. **Customize commands** for your workflow

## 🔗 Resources

- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [MCP Protocol](https://modelcontextprotocol.io)
- [AgentGPT Repository](https://github.com/reworkd/AgentGPT)

## 🤝 Contributing

When adding new automation:
1. Document in appropriate .md file
2. Add to this README
3. Test thoroughly
4. Update QUICK_REFERENCE.md if needed

---

**Made with ⚡ for rapid development**
