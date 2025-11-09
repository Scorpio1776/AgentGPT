---
description: Run tests and build to verify code quality before committing
---

Run comprehensive code quality checks:

1. **Lint the codebase:**
   - Run `npm run lint`
   - Show any linting errors
   - Offer to auto-fix if errors found

2. **Run test suite:**
   - Run `npm test`
   - Display test results summary
   - If failures occur, show which tests failed

3. **Build the project:**
   - Run `npm run build`
   - Show build output
   - Report any build errors or warnings

4. **Summary:**
   - Display overall pass/fail status
   - Show what passed/failed
   - Provide recommendations for next steps

Use parallel tool calls for lint and test if they're independent.
Exit early if any step fails critically.
