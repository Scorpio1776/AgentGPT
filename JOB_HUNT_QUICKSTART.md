# 🚀 Job Hunt Quick Start - 5 Minutes to Your First Agent

**Get started with AI-powered job hunting RIGHT NOW**

---

## ⚡ 3-Step Setup

### Step 1: Export from Resume Monster (2 min)

**In your Resume Monster Claude Project, ask:**

```
Please export my professional profile in this format for job hunting automation:

---
NAME: [Your name]
EMAIL: [Your email]
LOCATION: [Your location]
LINKEDIN: [Your LinkedIn URL]

SUMMARY:
[2-3 sentence professional summary]

TARGET ROLES:
[List 3-5 target job titles]

TARGET COMPANIES:
[List dream companies or company types]

TOP SKILLS:
[10-15 key technical skills]

EXPERIENCE HIGHLIGHTS:
[For each role - company, title, 3 key achievements with metrics]

PREFERENCES:
Remote: [Yes/No/Flexible]
Min Salary: $[amount]
Must-haves: [3-5 requirements]
Deal-breakers: [2-3 things to avoid]
---

Make it concise and ready to copy-paste.
```

### Step 2: Save Locally (1 min)

```bash
# Create your profile file
nano ~/.my-profile.txt

# Paste the export from Resume Monster
# Save (Ctrl+O, Enter, Ctrl+X)
```

### Step 3: Test Your First Agent (2 min)

**From Telegram/Discord/OpenClaw:**

```
/agent "Job Finder Test" - I'm looking for [your target role] positions. My profile is in ~/.my-profile.txt. Find 5 jobs posted this week that match my skills and preferences. For each job, explain why it's a good fit.
```

**Done! 🎉** Your first AI job search agent is running!

---

## 🎯 5 Essential Agents to Use Daily

### 1. Morning Job Search (Automate This!)

```
/agent "Daily Job Scout" - Using profile from ~/.my-profile.txt, find new [target role] positions posted in last 24 hours at [target companies/industry]. Return top 5 with match scores and apply-by dates.
```

**Expected result:** 5 carefully selected jobs with reasoning

### 2. Quick Company Check

**When you find an interesting job:**

```
/agent "Company Quick Check" - Research [Company Name]: culture, recent news, interview process, red flags. Should I apply? (My profile: ~/.my-profile.txt)
```

**Expected result:** Go/no-go recommendation in 3 minutes

### 3. Resume Tailor

**When you decide to apply:**

```
/agent "Resume Tailor" - Using my profile from ~/.my-profile.txt, create tailored resume for [Company] [Role]. Job description: [paste JD or link]. Emphasize matching skills and achievements.
```

**Expected result:** Customized resume in markdown format

### 4. Application Tracker

**After applying:**

```
/agent "Log Application" - Applied to [Company] for [Role] today. Status: Applied. Profile match: [High/Medium]. Follow-up date: [7 days from now].
```

**Expected result:** Logged in your tracking system

### 5. Interview Prep

**When you get an interview:**

```
/agent "Interview Prep" - [Company] [Role] interview in [N] days. My profile: ~/.my-profile.txt. Prepare: likely questions, technical topics to review, questions to ask them, my 2-min pitch.
```

**Expected result:** Complete prep package

---

## 📱 Set Up Automation (Optional but Powerful)

### Daily Morning Job Search

Add to `~/.openclaw/config.yaml`:

```yaml
schedules:
  morning_jobs:
    cron: "0 9 * * *"  # 9 AM every day
    command: "/agent 'Daily Job Scout' - Using ~/.my-profile.txt, find new jobs posted yesterday"
    channel: telegram  # or discord, whatsapp

  weekly_pipeline_review:
    cron: "0 9 * * 1"  # 9 AM Mondays
    command: "/agent 'Pipeline Review' - Show status of all my applications, highlight what needs follow-up"
    channel: telegram
```

**Result:** Every morning, you wake up to curated job opportunities!

---

## 💡 Pro Tips for Immediate Results

### ✅ Be Specific

**Bad:**
```
/agent "Find jobs" - Find me some jobs
```

**Good:**
```
/agent "Senior SWE Jobs" - Using ~/.my-profile.txt, find Senior Software Engineer roles at AI companies (Anthropic, OpenAI, Cohere, Hugging Face) posted this week, remote-friendly, $180k+ base. Return top 5 with match reasoning.
```

### ✅ Use Context Files

**Instead of typing your background every time:**
```
My profile: ~/.my-profile.txt
```

**Agents can read it automatically**

### ✅ Track Everything

**Create a simple tracker:**
```
/agent "Create Tracker" - Set up application tracking system with: Company, Role, Date Applied, Status, Follow-up Date, Notes. Initialize with my 3 recent applications: [list them]
```

### ✅ Iterate and Optimize

**After 1 week:**
```
/agent "Optimize Strategy" - I've applied to 10 jobs with 2 responses (20%). Analyze: what's working? What should I change? Profile: ~/.my-profile.txt
```

---

## 🎬 Example: Your First Day

### 9:00 AM - Find Jobs

```
You: /agent "Job Scout" - Find 10 Senior SWE jobs at AI companies. Profile: ~/.my-profile.txt

[3 minutes later]

Agent:
Found 10 positions, top 5:

1. Staff ML Engineer @ Anthropic (Match: 95%)
   Posted: 18h ago
   $200k-$280k, Remote
   Why: Strong ML background, AI safety mission alignment
   Link: [url]

2. Senior SWE @ OpenAI (Match: 90%)
   Posted: 2d ago
   $190k-$250k, SF or Remote
   Why: LLM infrastructure, systems experience
   Link: [url]

[... 3 more]

Recommend: Apply to #1 and #2 today
```

### 10:00 AM - Research

```
You: /agent "Quick Research" - Research Anthropic for my application

[2 minutes later]

Agent:
Anthropic Overview:
- Founded: 2021 by ex-OpenAI researchers
- Mission: AI safety, beneficial AI
- Product: Claude (LLM competitor to ChatGPT)
- Size: ~150 people, 40% engineering
- Funding: $7B valuation, well-funded
- Culture: Research-driven, safety-focused, careful engineering

Interview Process:
1. Phone screen (technical)
2. Take-home (ML systems design)
3. Onsite (4-5 rounds)
4. Focus: ML depth + safety awareness

Glassdoor: 4.8/5 ⭐⭐⭐⭐⭐
Pros: Mission, smart colleagues, cutting-edge work
Cons: Intense, high bar

Recommendation: STRONG APPLY ✅
```

### 11:00 AM - Tailor Resume

```
You: /agent "Tailor Resume" - For Anthropic Staff ML Engineer. Profile: ~/.my-profile.txt. JD: [paste]

[4 minutes later]

Agent:
# Tailored Resume for Anthropic

[Complete tailored resume emphasizing:]
- ML systems at scale
- Production infrastructure
- Safety-conscious engineering
- Research interest in AI alignment
- [Your specific relevant achievements]

Save this as: ~/resume-anthropic-staff-ml.md

Cover Letter draft also created: ~/coverletter-anthropic.md
```

### 12:00 PM - Apply! ✅

```
[You review, make tweaks, submit application]
```

### 12:30 PM - Track It

```
You: /agent "Log It" - Applied to Anthropic Staff ML Engineer, used tailored resume v2, emphasized safety + scale

Agent:
✅ Logged:
- Company: Anthropic
- Role: Staff ML Engineer
- Applied: 2024-02-12
- Status: Applied
- Match: 95%
- Follow-up: 2024-02-19 (7 days)
```

### 2:00 PM - Network

```
You: /agent "Network Scout" - Find 3 ML engineers at Anthropic to connect with

[2 minutes later]

Agent:
Found 3 people to connect with:

1. Sarah Chen - ML Infrastructure Lead
   LinkedIn: [url]
   Background: Ex-Google Brain, Stanford PhD
   Connection: "Hi Sarah, applied for Staff ML Engineer role..."

2. Mike Rodriguez - Senior ML Engineer
   LinkedIn: [url]
   Background: Ex-Meta, similar to your background
   Connection: "Hi Mike, fellow production ML engineer here..."

3. Lisa Park - Engineering Manager
   LinkedIn: [url]
   Background: Hiring manager for this role
   Connection: "Hi Lisa, excited about AI safety mission..."

[Full message drafts provided]
```

### End of Day

**Applied to: 2 companies ✅**
**Networked with: 6 people ✅**
**Researched: 3 companies ✅**
**Tracked: All applications ✅**

**Time invested: 2 hours**
**Traditional method would be: 8+ hours**

---

## 📊 Track Your Success

### Week 1 Goals

- [ ] Set up profile file (~/.my-profile.txt)
- [ ] Test 5 different agents
- [ ] Apply to 5 jobs using agents
- [ ] Research 10 companies
- [ ] Network with 10 people
- [ ] Set up daily automation

### Week 2 Goals

- [ ] Optimize based on response rate
- [ ] Get first interview
- [ ] Complete interview prep with agent
- [ ] Apply to 10 more jobs
- [ ] Expand network to 25 people

### Measure These

```
/agent "Weekly Stats" - Calculate:
- Applications sent
- Response rate
- Interview conversion
- Best performing job types
- Optimization suggestions
```

---

## 🆘 Troubleshooting

### "Agent isn't finding good matches"

**Solution:** Make your profile more specific

```bash
# Edit profile
nano ~/.my-profile.txt

# Add more details:
- Specific technologies you want to work with
- Company size preferences
- Industry focus
- Culture requirements
```

### "Responses are too generic"

**Solution:** Give more context in prompts

```
# Instead of:
/agent "Find jobs" - Find jobs

# Do this:
/agent "Targeted Search" - Profile: ~/.my-profile.txt. Find [specific role] at [specific companies] with [specific requirements]. Focus on [priorities]. Avoid [deal-breakers].
```

### "Taking too long"

**Solution:** Use parallel agents

```
# Run multiple at once:
/agent "Job Search 1" - AI companies
/agent "Job Search 2" - Big tech
/agent "Job Search 3" - Startups

# Results come back simultaneously
```

---

## 🎓 Learn More

- **Complete Guide:** `JOB_HUNT_GUIDE.md` (comprehensive workflows)
- **Claude Project Integration:** `CLAUDE_PROJECT_INTEGRATION.md` (Resume Monster connection)
- **OpenClaw Setup:** `OPENCLAW_INTEGRATION.md` (technical setup)

---

## 🚀 Next Steps

1. **RIGHT NOW:** Export from Resume Monster → save to `~/.my-profile.txt`
2. **IN 5 MINUTES:** Test your first agent (job search)
3. **TODAY:** Apply to 1 job using agents
4. **THIS WEEK:** Set up daily automation
5. **ONGOING:** Iterate and optimize

---

**You're ready! Send your first command to OpenClaw and watch the magic happen! 🎯🤖**

Sample first command to copy-paste (customize it):
```
/agent "My First Job Search" - Using my profile from ~/.my-profile.txt, find 5 [Your Target Role] positions at [Your Target Companies] posted this week. For each, explain why it matches my background and provide application link.
```

**Go get that dream job! 💪**
