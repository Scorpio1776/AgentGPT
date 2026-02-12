# 🔗 Integrating Claude Projects with OpenClaw Job Hunt

**How to use your Resume Monster Claude Project with OpenClaw + AgentGPT for job hunting**

---

## Overview

You have **3 powerful AI systems** that work together:

1. **Claude Project (Resume Monster)** - Stores your resume data, experience, skills
2. **OpenClaw** - Multi-channel gateway (Telegram, Discord, WhatsApp)
3. **AgentGPT** - Autonomous agent execution engine

Let's connect them for maximum job hunting power! 🎯

---

## How It Works

```
┌─────────────────────┐
│  Claude Project:    │
│  Resume Monster     │  ← Your resume data, experience, achievements
│  (Claude.ai)        │
└──────────┬──────────┘
           │
           │ (You export or reference)
           ↓
┌─────────────────────┐
│  OpenClaw           │  ← You send commands via Telegram/Discord
│  (Multi-channel)    │
└──────────┬──────────┘
           │
           │ HTTP webhook
           ↓
┌─────────────────────┐
│  AgentGPT           │  ← Executes autonomous agents
│  (Task execution)   │
└──────────┬──────────┘
           │
           ↓
      Results sent back to you via OpenClaw
```

---

## Setup: 3 Integration Methods

### Method 1: Manual Copy-Paste (Simplest)

**Best for:** Quick starts, occasional use

**How it works:**

1. **Export from Resume Monster (Claude Project):**
   - Open your Resume Monster project in Claude
   - Ask: "Export my complete resume data in JSON format"
   - Copy the JSON output

2. **Save locally:**
```bash
# Create file
cat > ~/.resume-data.json << 'EOF'
{
  # Paste the JSON from Claude Project here
}
EOF
```

3. **Reference in OpenClaw commands:**
```
/agent "Resume Tailor" - Using my data from ~/.resume-data.json, tailor resume for [job]
```

**Pros:** Simple, no setup
**Cons:** Manual updates needed

---

### Method 2: Claude Project as Reference (Recommended)

**Best for:** Regular use, keeping data in sync

**How it works:**

Store key context in a prompt template that references your Claude Project.

1. **In your Resume Monster Claude Project, create a structured export:**

Ask Claude:
```
Create a comprehensive summary of my professional profile in this format:

## Personal Info
[Name, contact, LinkedIn, etc.]

## Professional Summary
[2-3 sentence summary]

## Core Skills
[Categorized skills list]

## Experience Highlights
For each role:
- Company, Title, Duration
- Top 3-5 achievements with metrics
- Key technologies

## Projects
[Notable projects with impact]

## Education
[Degrees and certifications]

## Preferences
- Target roles: [...]
- Target companies: [...]
- Must-haves: [...]
- Deal-breakers: [...]

Save this as my canonical resume export.
```

2. **Copy that structured summary and create a prompt file:**

```bash
cat > ~/.job-hunt-context.txt << 'EOF'
# My Professional Profile (from Resume Monster Claude Project)

## Personal Info
Name: John Doe
Email: john@example.com
Location: San Francisco, CA
LinkedIn: linkedin.com/in/johndoe
GitHub: github.com/johndoe

## Professional Summary
Senior Software Engineer with 8+ years building scalable systems and leading teams.
Specialized in AI/ML infrastructure, distributed systems, and developer tools.
Proven track record of delivering high-impact products to millions of users.

## Core Skills
**Languages:** Python, TypeScript, Go, Rust
**Frameworks:** React, Node.js, FastAPI, TensorFlow, PyTorch
**Infrastructure:** AWS, Kubernetes, Docker, Terraform
**Specialties:** ML Systems, Distributed Computing, API Design, System Architecture

## Experience Highlights

### Senior Engineer @ Tech Company (2020-2024)
- Led team of 5 engineers building ML platform serving 10M users
- Reduced infrastructure costs by 40% through optimization
- Shipped 3 major features increasing engagement by 25%
- Mentored 8 junior engineers, 4 promoted

### Software Engineer @ Startup Inc (2018-2020)
- First engineering hire, built product from 0 to $5M ARR
- Designed system architecture handling 1M requests/day
- Implemented CI/CD pipeline reducing deploy time by 80%

### Software Engineer @ Big Corp (2016-2018)
- Built microservices platform used by 50+ internal teams
- Improved API latency by 60% through caching strategy
- Contributed to open source projects with 10K+ stars

## Notable Projects
- **ML Inference Platform:** Scaled from 1K to 10M predictions/day
- **Developer Tools:** CLI used by 5K+ engineers daily
- **Open Source:** Contributor to TensorFlow, Kubernetes

## Education
- BS Computer Science, Top University (2016)
- Certifications: AWS Solutions Architect, Google ML Engineer

## Job Search Preferences
**Target Roles:** Senior SWE, Staff Engineer, Engineering Manager
**Target Companies:** AI-first (Anthropic, OpenAI, Cohere), Top Tech (Google, Meta), High-growth startups
**Remote:** Strongly prefer remote or SF-based
**Compensation:** $180k-$250k base + equity
**Must-haves:** Strong engineering culture, interesting technical challenges, growth opportunities
**Deal-breakers:** No remote, poor work-life balance, outdated tech stack

EOF
```

3. **Use in OpenClaw commands:**

```
/agent "Job Application Helper" -
Context: I'm a senior engineer with ML/distributed systems background (see ~/.job-hunt-context.txt for full profile).

Task: Analyze this job posting [link/JD] and:
1. Match score (0-100) with reasoning
2. Tailor resume highlighting relevant experience
3. Draft cover letter
4. Identify skills gaps
5. Recommend go/no-go
```

**Pros:** Structured, reusable, easy to update
**Cons:** Manual sync when resume changes

---

### Method 3: API Bridge (Advanced)

**Best for:** Power users, frequent updates

**Create a simple API that bridges Claude Project data:**

```javascript
// File: ~/resume-api/server.js
// Simple Express server that serves resume data

const express = require('express');
const app = express();

// Your resume data (exported from Claude Project)
const resumeData = {
  personal: {
    name: "John Doe",
    email: "john@example.com",
    // ... from Resume Monster
  },
  experience: [
    // ... from Resume Monster
  ],
  skills: {
    // ... from Resume Monster
  },
  // etc.
};

app.get('/resume', (req, res) => {
  res.json(resumeData);
});

app.get('/resume/summary', (req, res) => {
  res.json({
    name: resumeData.personal.name,
    summary: resumeData.summary,
    topSkills: resumeData.skills.core.slice(0, 10),
    experience: resumeData.experience.map(e => ({
      company: e.company,
      role: e.title,
      duration: e.duration
    }))
  });
});

app.listen(3001, () => {
  console.log('Resume API running on http://localhost:3001');
});
```

**Start the API:**
```bash
cd ~/resume-api
npm init -y
npm install express
node server.js
```

**Use in agents:**
```
/agent "Resume Fetcher" - Get my resume from http://localhost:3001/resume and tailor for [job]
```

**Pros:** Dynamic, API-driven, automation-friendly
**Cons:** Requires setup and maintenance

---

## Recommended Workflow

### Step 1: Initial Setup (One-time)

**In Resume Monster Claude Project:**

```
Hi Claude, I want to use my Resume Monster data with OpenClaw for job hunting automation.

Please create:

1. A comprehensive professional profile summary (structured format)
2. A JSON export of all my experience, skills, projects
3. A list of my top 10 achievements with metrics
4. My target job search criteria

Format everything so I can copy-paste into a local file for reference by other AI agents.
```

**Save Claude's response to:**
- `~/.job-hunt-context.txt` (human-readable)
- `~/.resume-data.json` (machine-readable)

### Step 2: Daily Job Hunting with OpenClaw

**Morning (Automated - 9 AM):**

OpenClaw runs scheduled agent:
```yaml
# In ~/.openclaw/config.yaml
schedules:
  daily_job_search:
    cron: "0 9 * * *"
    command: "/agent 'Daily Job Scout' - Find new Senior SWE/Staff Engineer roles at AI companies posted in last 24 hours. My profile: ~/.job-hunt-context.txt. Return top 5 matches with reasoning."
    channel: telegram
```

You receive in Telegram:
```
☀️ Daily Job Report - Feb 12

Found 5 new matches:

1. Staff ML Engineer @ Anthropic (95% match)
   Posted: 12h ago
   Why: Strong AI safety focus, ML infra, matches your background
   Link: [...]

2. Senior SWE @ OpenAI (90% match)
   Posted: 8h ago
   Why: LLM infrastructure, distributed systems, great comp
   Link: [...]

[... 3 more]
```

**When You Find Interesting Job:**

```
/agent "Application Package" -
Job: Anthropic Staff ML Engineer [paste link or JD]
My profile: ~/.job-hunt-context.txt

Create complete application package:
1. Match analysis (strengths, gaps)
2. Tailored resume (markdown format)
3. Cover letter emphasizing AI safety + production ML
4. Company research notes
5. 3 employees to network with
6. Go/no-go recommendation
```

**After Applying:**

```
/agent "Track It" -
Applied to: Anthropic - Staff ML Engineer
Date: Today
Status: Applied
Notes: Strong cultural fit, exciting AI safety mission
Referral: None
Follow-up date: 7 days from now
```

### Step 3: Interview Prep

**When You Get Interview:**

```
/agent "Interview Prep Package" -
Company: Anthropic
Role: Staff ML Engineer
Interview: Phone screen in 3 days
My background: ~/.job-hunt-context.txt

Prepare:
1. Research Anthropic (mission, culture, recent news, tech blog)
2. 10 likely questions with STAR-format answers from my experience
3. Technical topics to review (from JD + company tech)
4. 8 smart questions to ask them
5. Research interviewer (if provided: [name])
6. My 2-minute pitch
7. Day-by-day study plan

Deliver comprehensive prep document.
```

### Step 4: Offer Evaluation

**When You Get Offer:**

```
/agent "Offer Analyst" -
Offer: Anthropic Staff ML Engineer
- Base: $210k
- Equity: 0.12%
- Bonus: $40k
- Benefits: [details]

My current: [if applicable]
My expectations: $220k base, 0.15% equity (from ~/.job-hunt-context.txt)

Analyze:
1. Market comparison (OpenAI, Google AI, similar roles)
2. 4-year total comp calculation
3. Equity valuation scenarios
4. Negotiation strategy
5. Counter-offer email draft
6. Accept/negotiate/decline recommendation
```

---

## Example: Complete Job Application

### 📋 **Scenario:** You see Anthropic is hiring

**Step 1: Initial Research**

```
[You in Telegram to OpenClaw]
/agent "Quick Check" - Is Anthropic Staff ML Engineer a good fit for me? (My profile: ~/.job-hunt-context.txt, JD: [link])
```

**Agent responds in 2 minutes:**
```
Match Score: 92/100

✅ Strong Matches:
- 8 years ML/systems experience (they want 7+)
- Production ML at scale (you: 10M users, they need this)
- Team leadership (you led 5 engineers)
- AI safety interest (your projects show this)

⚠️ Potential Gaps:
- Specific LLM experience (you have general ML)
- Research background (you're industry-focused)

✅ Recommendation: APPLY - Strong fit, gaps are minor

Next steps:
1. Emphasize production ML scale in resume
2. Highlight any LLM-adjacent work
3. Mention AI safety awareness in cover letter
4. Network with current Anthropic ML engineers
```

**Step 2: Create Application**

```
/agent "Application Builder" - Create full application package for Anthropic Staff ML Engineer using my profile from ~/.job-hunt-context.txt
```

**Agent delivers in 5 minutes:**
```
📦 Application Package Ready

1. TAILORED RESUME (see attached)
   Emphasized:
   - ML infrastructure at scale
   - Production systems serving millions
   - Team leadership and mentorship
   - System design and optimization

2. COVER LETTER (see attached)
   Highlights:
   - Mission alignment with AI safety
   - Relevant experience scaling ML systems
   - Interest in LLM infrastructure challenges
   - Cultural fit (research-driven, careful engineering)

3. COMPANY RESEARCH
   - Founded 2021, $7B valuation
   - 150 employees, 40% engineering
   - Mission: AI safety and beneficial AI
   - Products: Claude (LLM), Constitutional AI research
   - Culture: Research-driven, thorough, safety-focused
   - Interview: 3-4 rounds, emphasis on ML systems + safety awareness

4. NETWORKING TARGETS
   - Sarah Chen (ML Infra Lead) - linkedin.com/in/...
   - Mike Rodriguez (Staff Engineer) - linkedin.com/in/...
   - Lisa Park (Engineering Manager) - linkedin.com/in/...

5. RECOMMENDATION: GO - Apply today
   - Strong fit (92%)
   - Active hiring
   - Your skills match well
   - Culture alignment
```

**You review, make tweaks, and apply! ✅**

**Step 3: Track & Follow-up**

```
/agent "Log Application" - Applied to Anthropic Staff ML Engineer today, used tailored resume v2, emphasized ML scale + safety awareness
```

**Step 4: Network (same day)**

```
/agent "LinkedIn Message" - Draft connection request to Sarah Chen at Anthropic, mentioning shared interest in production ML systems and AI safety
```

**Agent provides:**
```
Subject: Fellow ML infrastructure enthusiast

Hi Sarah,

I noticed you're leading ML infrastructure at Anthropic and recently applied for the Staff ML Engineer role. I've spent the last 4 years building ML platforms at scale (10M+ users) and am deeply interested in the unique challenges of LLM infrastructure and AI safety.

Would love to connect and learn more about your work at Anthropic!

Best,
John
```

**You send connection requests to 3 people ✅**

---

## Syncing Resume Monster Updates

**When you update Resume Monster:**

1. **Ask Resume Monster Claude Project:**
```
I updated my experience with a new role. Please export my updated professional profile in the same format as before.
```

2. **Copy the output to local files:**
```bash
# Update your context file
nano ~/.job-hunt-context.txt
# Paste new export

# Update JSON if using
nano ~/.resume-data.json
# Paste new JSON export
```

3. **Future agents automatically use updated data**

**Automate this (optional):**

Create a reminder:
```yaml
# ~/.openclaw/config.yaml
schedules:
  weekly_resume_sync:
    cron: "0 9 * * 1"  # Monday 9 AM
    command: "REMINDER: Sync Resume Monster updates to ~/.job-hunt-context.txt"
    channel: telegram
```

---

## Pro Tips

### 1. **Keep Versions**

```bash
# When updating resume for specific job
/agent "Resume Variant" - Create version of my resume (from ~/.resume-data.json) optimized for ML Engineering at startups. Save as resume-ml-startup.md

# You'll have:
~/.resume-data.json (master)
~/resume-ml-startup.md (variant)
~/resume-research-heavy.md (variant)
~/resume-leadership.md (variant)
```

### 2. **Use Claude Project for Prep, OpenClaw for Execution**

**Resume Monster (Claude Project):**
- Store comprehensive experience details
- Keep track of all achievements
- Maintain project lists
- Update as you grow

**OpenClaw + AgentGPT:**
- Daily job searches
- Quick tailoring
- Application tracking
- Interview prep
- Networking automation

### 3. **Create Job-Specific Context**

For important applications:

```
/agent "Deep Application Prep" -
Job: Anthropic Staff ML Engineer
My full profile: ~/.job-hunt-context.txt
Job description: [full JD]

Create custom context file at ~/anthropic-staff-context.txt with:
1. All relevant experience mapped to JD requirements
2. Achievement stories that match their needs
3. Technical depth in areas they care about
4. Cultural alignment points
5. Questions they might ask + my answers
6. Questions I should ask them

This will be my reference for all Anthropic-related prep.
```

Then use for everything Anthropic-related:
```
/agent "Interview Prep" - Using ~/anthropic-staff-context.txt, prepare me for phone screen tomorrow

/agent "Follow-up Email" - Using ~/anthropic-staff-context.txt, draft thank you email highlighting [discussion points]
```

### 4. **Leverage Both Claude Instances**

**Resume Monster Claude Project:**
- Deep, reflective career analysis
- "What are my strongest achievements?"
- "How should I position myself for AI Safety roles?"
- "What's my career narrative?"

**OpenClaw Agents (quick, task-focused):**
- "Find 10 jobs posted today"
- "Tailor resume for this JD"
- "Research this company"
- "Track this application"

**Use each for what they're best at!**

---

## Example Daily Routine

### Morning

**9:00 AM** - Scheduled agent finds new jobs
```
📬 Telegram notification:
"5 new jobs found, 2 strong matches"
```

**9:15 AM** - You review on phone
```
You: /agent "Analyze" - Compare these 2 jobs, which should I prioritize?
```

**9:20 AM** - Agent recommends
```
Agent: Anthropic is stronger match (92% vs 85%), apply first
```

### Afternoon

**2:00 PM** - Deep work time
```
You: /agent "Full Application" - Build complete package for Anthropic

[5 minutes later]
Agent: Package ready - resume, cover letter, research, networking targets

You: [Review, apply, network]
```

### Evening

**7:00 PM** - Interview prep
```
You: /agent "Study Plan" - I have Anthropic phone screen Friday (3 days). Create daily prep schedule

Agent:
Day 1 (today): Company research + resume review
Day 2: Technical review (ML systems, distributed computing)
Day 3: Mock questions + pitch practice
```

---

## Measuring Success

**Weekly Review Agent:**

```
/agent "Weekly Report" - Review my job hunt week:

Applications: [from tracker]
Responses: [from tracker]
Interviews: [from tracker]

Analysis:
- Response rate trends
- Best performing job types/companies
- Time investment vs results
- Next week optimization suggestions

Reference: All tracked applications from past week
```

---

## 🎯 Action Items for You

### Today:
1. ✅ Open Resume Monster Claude Project
2. ✅ Export complete professional profile
3. ✅ Save to `~/.job-hunt-context.txt`
4. ✅ Test with one agent: `/agent "Find Jobs" - Using ~/.job-hunt-context.txt, find 5 jobs I'd be great for`

### This Week:
1. ✅ Set up daily job search automation
2. ✅ Apply to 3 jobs using agents
3. ✅ Track applications with agents
4. ✅ Network with 5 people using agent-drafted messages

### Ongoing:
1. ✅ Update Resume Monster weekly
2. ✅ Sync to local files monthly
3. ✅ Refine agent prompts based on results
4. ✅ Build library of successful templates

---

**You now have a complete AI-powered job hunting system! 🚀**

**The setup:**
- Resume Monster (Claude Project) = Your career database
- OpenClaw = Your command center (Telegram/Discord/WhatsApp)
- AgentGPT = Your autonomous execution engine

**The result:**
- Automated daily job searches
- Fast, tailored applications
- Comprehensive interview prep
- Strategic networking
- Data-driven optimization

Want me to help you create your initial profile export or test your first agent?
