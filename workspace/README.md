# Workspace Directory

This directory stores all locally generated data from AgentGPT pipelines.

**Privacy Note:** All data here stays on your local PC and is never sent to the cloud.

## Directory Structure

```
workspace/
├── leads/           ← Lead generation results (JSON files)
├── jobs/            ← Job search and analysis results
├── websites/        ← Scraped website data
└── marketing/       ← Generated marketing content
```

## Storage Format

All data is saved as JSON files with timestamps for easy organization:

```
leads/
├── saas_companies_2025-11-09T10-30-00.json
├── tech_startups_2025-11-09T11-15-00.json
└── ...
```

## Data Retention

You control all data in this directory:
- Files are never automatically deleted
- You can safely delete old files anytime
- No cloud sync or backup (unless you configure it)

## .gitignore

This directory is git-ignored by default to prevent accidentally committing private business data to version control.
