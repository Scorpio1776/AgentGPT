---
description: Run complete deployment workflow with pre-flight checks
---

Run the complete deployment workflow for AgentGPT:

1. **Pre-flight checks:**
   - Run linter (npm run lint)
   - Run tests (npm test)
   - Build project (npm run build)
   - Verify .env has required variables

2. **If all checks pass:**
   - Commit any uncommitted changes with descriptive message
   - Push to current branch
   - Display deployment summary with next steps

3. **Handle failures gracefully:**
   - If lint fails: show errors and offer to fix
   - If tests fail: show failures and stop
   - If build fails: show errors and stop
   - Do not proceed with commit/push if any checks fail

4. **After successful deployment:**
   - Show git status
   - Show branch information
   - Suggest next steps (create PR, deploy to Vercel, etc.)

Be thorough but efficient. Use parallel tool calls where possible.
