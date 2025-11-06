# Getting Started with Your First AgentGPT App

Welcome! You've successfully set up your first AgentGPT application. This guide will help you create and run your first AI agent.

## What is AgentGPT?

AgentGPT is a platform that allows you to create autonomous AI agents that can:
- Break down complex goals into smaller tasks
- Execute tasks iteratively
- Learn from results and create new tasks
- Research information using web search
- Work autonomously to achieve your specified goals

## Setup Complete! ✅

The following setup has been completed for you:

1. ✅ Dependencies installed
2. ✅ Environment configuration created (`.env`)
3. ✅ SQLite database initialized
4. ✅ Prisma client generated

## Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### 2. Create Your First Agent (Mock Mode)

Since we're in **mock mode** (no OpenAI API key required), you can test the interface:

1. Open http://localhost:3000 in your browser
2. Enter an agent name (e.g., "MyFirstAgent")
3. Enter a goal (e.g., "Research the latest trends in AI")
4. Click "Deploy Agent"

The agent will run in mock mode, simulating responses without using the OpenAI API.

### 3. Enable Real AI Features (Optional)

To use actual AI capabilities:

1. Get an OpenAI API key from: https://platform.openai.com/api-keys
2. Edit `.env` and replace:
   ```
   OPENAI_API_KEY=changeme
   ```
   with:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. Disable mock mode:
   ```
   NEXT_PUBLIC_FF_MOCK_MODE_ENABLED=false
   ```
4. Restart the development server

## Example Agent Ideas

Here are some ideas for your first agents:

### 1. Research Assistant
- **Name:** ResearchBot
- **Goal:** "Find the top 5 JavaScript frameworks in 2024 and summarize their key features"

### 2. Learning Helper
- **Name:** CodeMentor
- **Goal:** "Create a step-by-step guide to learn React for beginners"

### 3. Creative Writer
- **Name:** StoryWriter
- **Goal:** "Write a short science fiction story about AI assistants"

### 4. Data Analyzer
- **Name:** DataBot
- **Goal:** "Analyze the benefits and drawbacks of remote work"

## Project Structure

```
AgentGPT/
├── src/
│   ├── components/        # React UI components
│   │   ├── AutonomousAgent.ts  # Main agent logic
│   │   ├── ChatWindow.tsx      # Agent output display
│   │   └── TaskWindow.tsx      # Task list display
│   ├── pages/
│   │   ├── index.tsx           # Home page (create agents)
│   │   └── api/                # API endpoints
│   ├── server/
│   │   └── api/routers/        # tRPC routers
│   └── services/
│       └── agent-service.ts    # LLM integration
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── db.sqlite               # SQLite database
└── .env                        # Configuration
```

## How It Works

1. **You define a goal** (e.g., "Research AI trends")
2. **Agent breaks it down** into smaller tasks
3. **Agent executes** each task using:
   - LLM reasoning (GPT models)
   - Web search (when needed)
4. **Agent creates new tasks** based on results
5. **Process repeats** until goal is achieved

## Configuration

### Model Settings

You can configure:
- **Model**: GPT-3.5-turbo or GPT-4
- **Temperature**: Creativity level (0-1)
- **Max loops**: How many task iterations
- **Language**: 20+ supported languages

Access settings via the gear icon in the UI.

### Agent Modes

- **Create**: Build new agent from scratch
- **Pause**: Pause execution
- **Stop**: Stop agent completely

## Saving Your Agents

To save agents and view history:

1. Enable authentication in `.env`:
   ```
   # Add OAuth providers (Google, GitHub, Discord)
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

2. Sign in via the UI
3. Run an agent
4. Click "Save" to store the agent run

Saved agents appear in your dashboard for replay and analysis.

## Advanced Features

### Custom Tools

Add custom tools in `src/services/custom-tools/`:
```typescript
// Example: Custom API integration
export class MyCustomTool extends Tool {
  name = "my-tool";
  description = "Does something custom";

  async _call(input: string): Promise<string> {
    // Your custom logic
    return result;
  }
}
```

### Custom Prompts

Modify prompts in `src/utils/prompts.ts`:
- `startGoalPrompt`: Initial task breakdown
- `executeTaskPrompt`: Task execution
- `createTasksPrompt`: New task generation

### API Integration

Use the tRPC API from your own apps:
```typescript
import { createTRPCProxyClient } from '@trpc/client';
import type { AppRouter } from './server/api/root';

const client = createTRPCProxyClient<AppRouter>({
  // ... configuration
});

// Create an agent programmatically
await client.agent.create.mutate({
  name: "MyAgent",
  goal: "Do something cool"
});
```

## Troubleshooting

### Issue: "API key not found"
- Make sure `.env` has `OPENAI_API_KEY` set
- Or enable mock mode: `NEXT_PUBLIC_FF_MOCK_MODE_ENABLED=true`

### Issue: "Database connection failed"
- Run: `npx prisma db push`
- Check that `prisma/db.sqlite` exists

### Issue: Port 3000 already in use
- Change port: `npm run dev -- -p 3001`

### Issue: Dependencies out of date
- Run: `npm install`
- Run: `npx prisma generate`

## Next Steps

1. 🚀 **Start the server**: `npm run dev`
2. 🎨 **Customize the UI**: Edit components in `src/components/`
3. 🧠 **Adjust prompts**: Modify `src/utils/prompts.ts`
4. 🔧 **Add features**: Extend the agent logic in `src/components/AutonomousAgent.ts`
5. 🌐 **Deploy**: Use Vercel, Docker, or your preferred platform

## Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npx prisma studio    # Open database GUI
npx prisma db push   # Sync database schema
```

## Resources

- **Documentation**: Check the `docs/` folder
- **Issues**: Report at https://github.com/reworkd/AgentGPT/issues
- **OpenAI Docs**: https://platform.openai.com/docs

## Community

- Star the project on GitHub
- Join discussions
- Contribute improvements

---

**Ready to build your first AI agent?** Run `npm run dev` and visit http://localhost:3000!

Happy building! 🎉
