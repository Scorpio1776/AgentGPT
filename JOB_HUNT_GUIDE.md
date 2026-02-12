# 🎯 Job Hunt Automation with OpenClaw + Claude + AgentGPT

**Complete guide to automating your job search using autonomous AI agents**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Job Search Workflows](#job-search-workflows)
- [Integrating ResuMme Monster](#integrating-resumme-monster)
- [Agent Commands](#agent-commands)
- [Daily Job Hunt Routine](#daily-job-hunt-routine)
- [Advanced Automation](#advanced-automation)
- [Tips for Success](#tips-for-success)

---

## Overview

This system helps you:

✅ **Automate job searching** - AI finds relevant positions daily
✅ **Tailor resumes** - Customize for each application automatically
✅ **Research companies** - Deep analysis before applying
✅ **Prepare for interviews** - Company-specific prep materials
✅ **Track applications** - Never lose track of where you applied
✅ **Network strategically** - Find the right people to connect with
✅ **Negotiate offers** - Research competitive compensation

---

## Quick Start

### 1. Set Up Your Profile Data

Create a file with your information (or link your ResuMme Monster data):

```bash
# Create your job hunt profile
cat > ~/.job-hunt-profile.json << 'EOF'
{
  "personal": {
    "name": "Your Name",
    "email": "you@email.com",
    "phone": "+1-555-0123",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "portfolio": "https://yourwebsite.com"
  },
  "summary": "Senior Software Engineer with 8+ years experience in...",
  "target_roles": [
    "Senior Software Engineer",
    "Staff Engineer",
    "Engineering Manager"
  ],
  "target_companies": [
    "Anthropic",
    "OpenAI",
    "Google DeepMind",
    "Startups in AI/ML space"
  ],
  "skills": {
    "languages": ["Python", "TypeScript", "Go"],
    "frameworks": ["React", "Node.js", "FastAPI"],
    "specialties": ["AI/ML", "Distributed Systems", "System Design"]
  },
  "experience": [
    {
      "company": "Previous Company",
      "role": "Senior Engineer",
      "duration": "2020-2024",
      "achievements": [
        "Led team of 5 engineers",
        "Scaled system to 10M users",
        "Reduced costs by 40%"
      ]
    }
  ],
  "education": [
    {
      "degree": "BS Computer Science",
      "school": "University Name",
      "year": "2016"
    }
  ],
  "preferences": {
    "remote_ok": true,
    "min_salary": 150000,
    "max_salary": 250000,
    "equity": true,
    "company_stage": ["Series A", "Series B", "Public"],
    "deal_breakers": ["No remote", "< 2 weeks PTO"]
  }
}
EOF
```

### 2. Configure OpenClaw for Job Hunting

Add to `~/.openclaw/config.yaml`:

```yaml
skills:
  agentgpt:
    enabled: true
    webhook_url: "http://localhost:3000/api/openclaw/webhook"
    webhook_token: "${OPENCLAW_WEBHOOK_TOKEN}"

  job_hunt:
    enabled: true
    profile_path: "~/.job-hunt-profile.json"
    resume_data_path: "~/ResuMmeMonster/data"  # Your ResuMme Monster path

channels:
  telegram:
    enabled: true
    skills: ["agentgpt", "job_hunt"]

  discord:
    enabled: true
    skills: ["agentgpt", "job_hunt"]

# Scheduled job searches
schedules:
  daily_job_search:
    cron: "0 9 * * *"  # 9 AM daily
    command: "/agent 'Daily Job Finder' - Search for new {target_roles} positions posted in last 24 hours at {target_companies} or similar companies. Filter by remote-friendly, $150k+, and strong engineering culture."
    channel: telegram

  weekly_company_research:
    cron: "0 10 * * 1"  # 10 AM Mondays
    command: "/agent 'Company Scout' - Research 3 new AI/ML companies that are hiring, analyze culture, growth, and opportunities."
    channel: telegram
```

### 3. Start Using Job Hunt Agents

From **Telegram, Discord, or WhatsApp**:

```
/agent "Job Finder" - Find 10 Senior Software Engineer positions in AI/ML companies, remote-friendly, posted in last 7 days
```

---

## Job Search Workflows

### 🔍 **Workflow 1: Daily Job Discovery**

**Morning routine (9 AM automated):**

```
/agent "Daily Job Scout" - Search for new Senior Software Engineer and Staff Engineer positions at AI companies (Anthropic, OpenAI, Scale AI, Hugging Face, etc.) posted in last 24 hours. Focus on: remote-friendly, strong engineering culture, competitive comp, interesting tech stack. Return top 5 with links and why they match.
```

**Response you'll get:**
```
Found 5 new positions:

1. Staff ML Engineer @ Anthropic
   Posted: 18 hours ago
   Location: Remote (US)
   Salary: $200k-$280k + equity
   Why it matches: Strong AI safety focus, research-driven culture, Claude development
   Link: [apply link]

2. Senior SWE @ Scale AI
   Posted: 6 hours ago
   Location: SF or Remote
   Salary: $180k-$240k
   Why: Leading AI data company, high-growth, cutting-edge ML infrastructure
   Link: [apply link]

[... 3 more]

Action items:
- Review JDs in detail
- Tailor resume for top 2
- Research company culture
- Check if you know anyone there
```

### 📝 **Workflow 2: Resume Tailoring**

**For each interesting job:**

```
/agent "Resume Tailor" - I'm applying to Anthropic's Staff ML Engineer role (JD: [paste job description]). Tailor my resume from ResuMme Monster data to highlight: 1) ML/AI experience, 2) Systems thinking, 3) Research background, 4) Safety-conscious engineering. Output optimized resume in markdown and suggest 3 key achievements to emphasize.
```

### 🏢 **Workflow 3: Company Deep Dive**

**Before applying:**

```
/agent "Company Researcher" - Deep research on Anthropic: company mission, culture, recent news, funding, leadership team, engineering blog posts, GitHub activity, employee reviews, interview process. Create comprehensive profile with: 1) What they value, 2) Red flags, 3) Questions to ask them, 4) How to position myself.
```

### 💼 **Workflow 4: Application Tracking**

**After applying:**

```
/agent "Application Tracker" - Log new application:
Company: Anthropic
Role: Staff ML Engineer
Applied: 2024-02-12
Status: Applied
Referral: None
Notes: Strong culture fit, exciting mission
Follow-up date: 2024-02-19
```

**Check status weekly:**

```
/agent "Application Status" - Show all active applications, highlight any that need follow-up, suggest next actions
```

### 🎤 **Workflow 5: Interview Prep**

**When you get an interview:**

```
/agent "Interview Prep Coach" - I have a phone screen with Anthropic for Staff ML Engineer role in 3 days. Prepare me with:
1. Company-specific questions they might ask
2. Technical topics to review (based on JD)
3. Questions I should ask them
4. 5 stories from my background to prepare (STAR format)
5. Research on my interviewer (if known)
6. Salary negotiation talking points
```

### 🤝 **Workflow 6: Strategic Networking**

```
/agent "Networking Finder" - Find 5 people at Anthropic I should connect with on LinkedIn:
- Current ML engineers (potential teammates)
- Engineering managers (hiring decision makers)
- People with similar background to me
- Alumni from my university
Provide: names, roles, LinkedIn profiles, connection approach for each
```

### 💰 **Workflow 7: Salary Research**

**Before negotiating:**

```
/agent "Comp Analyzer" - Research competitive compensation for Staff ML Engineer at Anthropic:
1. Base salary range (SF/Remote)
2. Equity packages (typical # of shares, value)
3. Comparable offers at OpenAI, Google Brain, Meta AI
4. Negotiation leverage points
5. Total comp estimation over 4 years
```

---

## Integrating ResuMme Monster

### Option 1: Direct File Access

If your ResuMme Monster data is local:

```bash
# Link to your data
ln -s ~/ResuMmeMonster/data ~/.resumme-data

# Update job profile
echo 'RESUME_DATA_PATH=~/.resumme-data' >> ~/.job-hunt-profile.json
```

Then agents can access with:
```
/agent "Resume Tailor" - Using data from ~/.resumme-data, tailor resume for [job]
```

### Option 2: Export to JSON

Export your ResuMme Monster data:

```bash
# If ResuMme Monster has export feature
resumme-monster export --format json --output ~/.my-resume.json

# Or manually create structured JSON
cat > ~/.my-resume.json << 'EOF'
{
  "personal": {...},
  "experience": [...],
  "education": [...],
  "skills": [...],
  "projects": [...],
  "achievements": [...]
}
EOF
```

### Option 3: Create API Endpoint

If ResuMme Monster is a web app, create an API:

```javascript
// In ResuMme Monster project
app.get('/api/resume/export', (req, res) => {
  const resumeData = {
    personal: getUserPersonalInfo(),
    experience: getUserExperience(),
    skills: getUserSkills(),
    // ...
  };
  res.json(resumeData);
});
```

Then agents can fetch:
```
/agent "Resume Builder" - Fetch my resume from http://localhost:5000/api/resume/export and tailor for [job]
```

---

## Agent Commands Reference

### 1. Job Search

```bash
# General search
/agent "Job Finder" - Search for [role] at [companies/industries] with [requirements]

# Specific search
/agent "AI Jobs" - Find all ML Engineer positions at AI-first companies (Anthropic, OpenAI, Hugging Face, Cohere, Scale AI) posted this week, remote OK

# Filtered search
/agent "Startup Jobs" - Find Senior Engineer roles at Series A-B AI startups in SF, $160k+ base, < 50 employees

# Comparison search
/agent "Role Comparer" - Compare Senior vs Staff Engineer roles at big tech (Google, Meta, Amazon) - responsibilities, comp, growth
```

### 2. Resume & Cover Letter

```bash
# Tailor resume
/agent "Resume Optimizer" - Tailor my resume for [company] [role], emphasizing [key skills/experience]

# Generate cover letter
/agent "Cover Letter Writer" - Write compelling cover letter for [company] [role], highlighting [achievements], addressing [their needs]

# Review resume
/agent "Resume Reviewer" - Review my resume for ATS optimization, impact statements, and clarity. Suggest improvements.

# Skills gap analysis
/agent "Skills Analyzer" - Compare my skills to [job description], identify gaps, suggest learning resources
```

### 3. Company Research

```bash
# Full company profile
/agent "Company Intel" - Deep dive on [company]: mission, culture, tech stack, interview process, comp, growth trajectory

# Culture assessment
/agent "Culture Scout" - Analyze [company] engineering culture from Glassdoor, Blind, blog posts, GitHub. Red flags?

# Competitive analysis
/agent "Company Comparer" - Compare [Company A] vs [Company B] vs [Company C] for Senior Engineer role

# News monitoring
/agent "Company News" - Find recent news about [company]: funding, launches, leadership changes, layoffs, sentiment
```

### 4. Interview Preparation

```bash
# General prep
/agent "Interview Coach" - Prepare me for [company] [role] interview: likely questions, technical topics, my stories to share

# Technical prep
/agent "Tech Interview Prep" - I'm interviewing for [role] in 5 days. Create study plan for: algorithms, system design, coding

# Behavioral prep
/agent "Behavioral Prep" - Generate 10 behavioral questions for [company] [role] with STAR-format answers from my background

# Mock interview
/agent "Mock Interviewer" - Conduct a mock behavioral interview for [role], ask 5 questions, evaluate my responses

# Post-interview
/agent "Thank You Writer" - Draft thank-you email for interviewer [name] at [company], mentioning [discussion points]
```

### 5. Application Tracking

```bash
# Add application
/agent "Track Application" - Log: Applied to [company] for [role] on [date], status: [Applied/Phone Screen/Onsite/Offer]

# Update status
/agent "Update Status" - [Company] moved to [new status], next step: [action], deadline: [date]

# View pipeline
/agent "Application Pipeline" - Show all applications by stage, highlight action items and deadlines

# Follow-up reminders
/agent "Follow-Up Tracker" - Check which applications need follow-up, draft follow-up messages
```

### 6. Networking

```bash
# Find contacts
/agent "Network Scout" - Find people to network with at [company]: engineers, managers, recruiters, alumni

# Outreach message
/agent "LinkedIn Message" - Draft connection request to [name] at [company] about [role/informational interview]

# Referral request
/agent "Referral Helper" - I know [person] at [company]. Draft referral request message for [role]

# Coffee chat prep
/agent "Coffee Chat Prep" - I'm meeting [name] from [company]. Research them, prepare questions, talking points
```

### 7. Offer Evaluation & Negotiation

```bash
# Offer analysis
/agent "Offer Analyzer" - Evaluate offer from [company]: $X base, Y equity, Z bonus. Compare to market, calculate 4-year value

# Negotiation strategy
/agent "Negotiation Coach" - Help me negotiate [company] offer. Current: [details]. Target: [goals]. Strategy?

# Counter-offer draft
/agent "Counter Offer Writer" - Draft counter-offer email to [company]: seeking [X% more base], [Y more equity], [Z benefit]

# Offer comparison
/agent "Offer Comparer" - Compare 2 offers: [Company A details] vs [Company B details]. Consider: comp, growth, culture, mission
```

---

## Daily Job Hunt Routine

### ☀️ Morning (9-10 AM)

**Automated agents run:**

```bash
# Agent 1: Daily job search
9:00 AM - "Daily Job Finder" searches for new positions

# Agent 2: Application status check
9:15 AM - "Status Checker" reviews pipeline, flags action items

# Agent 3: Company news
9:30 AM - "News Monitor" checks for updates on companies you're interviewing with
```

**You receive summary in Telegram:**
```
📋 Daily Job Hunt Report - Feb 12, 2024

🆕 New Jobs (5):
1. Staff Engineer @ Anthropic (posted 8h ago)
2. Senior ML @ Scale AI (posted 12h ago)
[...]

⚡ Action Items (3):
1. Follow up with OpenAI (applied 7 days ago)
2. Prepare for Anthropic phone screen (tomorrow 2 PM)
3. Send thank you to Meta interviewer

📰 Company Updates:
- Anthropic raised $100M Series C
- Scale AI hiring 50 engineers
```

### 🌆 Afternoon (2-5 PM)

**Your active work:**

```bash
# Review top jobs
/agent "Job Analyzer" - Analyze these 3 jobs in detail: [links]. Which is best fit? Priority order?

# Tailor resumes for top 2
/agent "Resume Tailor" - Customize for Anthropic Staff Engineer role

# Research companies
/agent "Company Deep Dive" - Full intel on Scale AI

# Apply
/agent "Application Helper" - Draft tailored cover letter for Anthropic
```

### 🌙 Evening (6-8 PM)

**Networking & learning:**

```bash
# Network
/agent "LinkedIn Scout" - Find 3 people at Anthropic to connect with, draft messages

# Interview prep
/agent "Interview Study Plan" - I have 5 days until phone screen. Create daily study schedule

# Skill building
/agent "Learning Path" - I need to brush up on distributed systems. Create 1-week learning plan
```

---

## Advanced Automation

### Automated Application Flow

Create a full pipeline agent:

```
/agent "Auto-Apply Pipeline" - For this job [link/description]:
1. Analyze if it matches my profile (min 80% fit)
2. If yes, tailor resume emphasizing relevant experience
3. Draft cover letter highlighting key matches
4. Research company culture and tech stack
5. Find 2 employees to network with
6. Create interview prep notes
7. Add to application tracker
8. Provide go/no-go recommendation with reasoning

Output complete application package if recommended.
```

### Interview Prep Automation

```
/agent "Interview Prep Bot" - I have Anthropic phone screen in 3 days:
1. Research company thoroughly
2. Analyze JD for technical requirements
3. Prepare 10 likely behavioral questions with STAR answers
4. Create technical study plan (algorithms, system design)
5. Research my interviewer on LinkedIn
6. List 8 smart questions to ask them
7. Prepare 3-minute "tell me about yourself" pitch
8. Create cheat sheet document

Deliver complete prep package with daily tasks.
```

### Weekly Pipeline Review

```
/agent "Weekly Review" - Analyze my job hunt this week:
1. Applications submitted (how many, where)
2. Response rate and trends
3. Interview stages progressed
4. Stuck applications (no response > 7 days)
5. Success patterns (which types of jobs respond?)
6. Optimization suggestions
7. Next week's goals and focus areas

Provide data-driven insights and action plan.
```

---

## Tips for Success

### 🎯 **Be Specific with Agents**

❌ **Bad:** `/agent "Find jobs" - Find me jobs`

✅ **Good:** `/agent "AI Job Finder" - Find Senior ML Engineer positions at AI-first companies (Anthropic, OpenAI, Cohere, Hugging Face) posted in last 7 days, remote-friendly, $180k+ base, focusing on LLM/GenAI work. Return top 10 with company info, salary, and application links.`

### 📊 **Track Everything**

Use agents to maintain your pipeline:

```
/agent "Pipeline Manager" - Update spreadsheet:
- Total applications: X
- Response rate: Y%
- Interview conversion: Z%
- Average time to response: N days
- Top responding companies/industries
- Identify patterns
```

### 🔄 **Iterate Based on Data**

```
/agent "Optimization Analyst" - I've sent 50 applications with 5 responses (10%). Analyze:
1. What's working (job types, companies, approaches)
2. What's not working
3. How to improve response rate
4. Should I adjust target roles/companies?
5. Is my resume/cover letter the issue?
```

### 🤝 **Prioritize Networking**

```
/agent "Network Strategy" - Create 30-day networking plan:
- Week 1: Connect with 10 people at target companies
- Week 2: Request 3 informational interviews
- Week 3: Attend 2 industry events/webinars
- Week 4: Follow up, build relationships

Provide specific names, companies, events, and outreach templates.
```

### ⚡ **Speed Matters**

Automate quick responses:

```
# Set up trigger: When job matches criteria, auto-generate application
/agent "Quick Apply Generator" - For jobs matching my profile, immediately generate:
1. Tailored resume
2. Cover letter
3. Application tracking entry
Ready to submit within 2 hours of posting
```

### 🎓 **Keep Learning**

```
/agent "Skill Gap Filler" - Based on 20 jobs I'm targeting, identify:
1. Most in-demand skills I'm missing
2. Nice-to-have skills to learn
3. Learning resources (courses, books, projects)
4. 90-day skill development plan
```

---

## Integration with ResuMme Monster

### Scenario 1: ResuMme Monster Has API

```javascript
// In your ResuMme Monster project, add:
app.get('/api/resume/tailored', async (req, res) => {
  const { jobDescription, emphasize } = req.query;

  // Get base resume data
  const baseResume = await getResumeData();

  // Use AI to tailor
  const tailored = await tailorResume(baseResume, jobDescription, emphasize);

  res.json({ tailored });
});
```

Then in OpenClaw:
```
/agent "Resume Fetcher" - Get tailored resume from http://localhost:5000/api/resume/tailored?jobDescription=[JD]&emphasize=ML,AI
```

### Scenario 2: ResuMme Monster Exports JSON

```bash
# Export your data
cd ~/ResuMmeMonster
npm run export -- --format json --output ~/resume-data.json

# Use in agents
/agent "Resume Builder" - Load resume from ~/resume-data.json and tailor for [job]
```

### Scenario 3: Manual Integration

Create a comprehensive resume JSON manually:

```json
{
  "name": "Your Name",
  "contact": {...},
  "summary": "...",
  "experience": [
    {
      "company": "Company A",
      "title": "Senior Engineer",
      "duration": "2020-2024",
      "achievements": [
        "Led team of 5 engineers building ML platform",
        "Scaled system from 100K to 10M users",
        "Reduced infrastructure costs by 40%"
      ],
      "technologies": ["Python", "TensorFlow", "AWS"],
      "impact_metrics": {
        "team_size": 5,
        "users_impacted": 10000000,
        "cost_savings": "40%"
      }
    }
  ],
  "projects": [...],
  "skills": {...}
}
```

Then reference in commands:
```
/agent "Resume Tailor" - Using ~/resume-data.json, create version emphasizing [aspects] for [company] [role]
```

---

## Example: Complete Job Application Flow

**Step-by-step walkthrough:**

### 1️⃣ Morning: Job Discovery

```
/agent "Job Scout" - Find Senior Software Engineer roles at AI companies posted today

→ Returns 8 jobs, you shortlist 2
```

### 2️⃣ Research Phase

```
/agent "Company Research" - Deep dive on Anthropic: culture, mission, tech, interview process

→ Returns comprehensive analysis
→ You decide it's a strong fit
```

### 3️⃣ Application Prep

```
/agent "Resume Tailor" - Using ~/resume-data.json, tailor for Anthropic Staff ML Engineer emphasizing: AI safety awareness, research experience, production ML systems

→ Returns optimized resume

/agent "Cover Letter" - Write cover letter for Anthropic highlighting mission alignment and relevant experience

→ Returns draft cover letter
```

### 4️⃣ Application Submit

```
→ You review and submit application
→ Log in tracker
```

### 5️⃣ Networking Follow-up

```
/agent "Network Scout" - Find 2 ML engineers at Anthropic to connect with

→ Returns names and LinkedIn profiles

/agent "LinkedIn Message" - Draft connection request mentioning shared interest in AI safety

→ Returns message template
→ You send connections
```

### 6️⃣ Interview Prep (When Scheduled)

```
/agent "Interview Prep" - Anthropic phone screen in 3 days, prepare me

→ Returns:
  - Likely questions
  - Technical topics to review
  - Questions to ask
  - 5 STAR stories
  - Interviewer research
```

### 7️⃣ Post-Interview

```
/agent "Thank You Email" - Draft for interviewer Sarah Chen at Anthropic, mention our discussion about AI safety

→ Returns email draft
→ You send
```

### 8️⃣ Offer Stage

```
/agent "Offer Analysis" - Anthropic offer: $200k base, 0.1% equity, $50k signing. Compare to market

→ Returns comprehensive analysis

/agent "Negotiation Strategy" - Help me negotiate for $220k base and 0.15% equity

→ Returns negotiation approach and email draft
```

---

## Measuring Success

Track your metrics with agents:

```
/agent "Success Tracker" - Weekly report:

Applications: 15
Responses: 3 (20%)
Phone Screens: 2
Onsites: 1
Offers: 0

Trends:
- AI companies: 30% response rate ✅
- Big tech: 10% response rate ⚠️
- Startups: 5% response rate ❌

Recommendations:
1. Focus more on AI-first companies
2. Improve big tech applications
3. Reconsider startup strategy
```

---

## 🚀 Next Steps

1. **Set up your job profile** - Create `~/.job-hunt-profile.json`
2. **Link ResuMme Monster data** - Export or create API
3. **Configure OpenClaw** - Add job hunt commands
4. **Start with one agent** - Try daily job search
5. **Build the habit** - Use agents every day
6. **Iterate and optimize** - Track what works

---

**You've got an AI-powered job hunt team working for you 24/7! 🎯🤖**

Let me know which agent you want to start with, or if you need help integrating your ResuMme Monster data!
