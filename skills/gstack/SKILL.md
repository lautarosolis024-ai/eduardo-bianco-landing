---
name: gstack
description: Strategic website building framework adapted from YC startup methodology. Use this skill whenever the user mentions /autoplan, /office-hours, /plan-ceo-review, /spec, /design-consultation, /design-shotgun, /build, /qa, /ship, /investigate, /review, /design-review, /context-save, /context-restore, or any gstack command. Also trigger when the user asks for strategic website planning, product diagnostics, competitive analysis, or a structured approach to building or improving a website or web app. This is the primary framework for turning a vague website idea into a shipped product that sells.
---

# GStack - Strategic Website Building Framework

GStack is a structured methodology for building websites that sell, adapted from Y Combinator's startup framework. Instead of jumping straight into code, GStack runs a diagnostic pipeline that forces specificity before building, ensuring every line of code serves a business purpose.

## How It Works in Z.ai

GStack commands are invoked by the user as `/command-name`. When you detect a gstack command, follow the corresponding section below. The pipeline is sequential but not mandatory - the user can skip steps or jump to any command.

### Command Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/office-hours` | Strategic diagnostic interview | Starting point, product uncertainty |
| `/autoplan` | Full automated site analysis + roadmap | Want action now, need a plan |
| `/plan-ceo-review` | Strategy & scope review with scoring | Validate direction, get CEO buy-in |
| `/plan-eng-review` | Architecture & technical review | Technical debt, scalability concerns |
| `/design-consultation` | Design system & UX strategy | Visual direction, brand alignment |
| `/spec` | Author a backlog-ready spec/issue | Before building any feature |
| `/design-shotgun` | Generate multiple design variants | Stuck on visual direction |
| `/build` | Execute a spec into code | Have a clear spec, ready to code |
| `/investigate` | Debug bugs & errors | Something is broken |
| `/review` | Code review & diff check | Before shipping |
| `/design-review` | Visual polish & UX audit | Looks off, needs refinement |
| `/qa` | Full QA testing | Before going live |
| `/ship` | Deploy to production | Ready to go live |
| `/context-save` | Save project state & progress | Ending a session |
| `/context-restore` | Resume from saved state | Starting a new session |

---

## /office-hours - Strategic Diagnostic

The YC Office Hours methodology adapted for web projects. This is a structured interview that separates real demand from wishful thinking.

### Process

1. **Determine project type** - Ask: Is this A) your own startup, B) a side project, C) building for your boss/company, D) freelance client work?

2. **Run the 5-punch diagnostic** (ask ONE at a time, wait for real answers):

   - **Q1: Demand Reality** - "What's the strongest evidence that this website will actually drive sales/leads?" (Not "we need a web presence" - what CONCRETE signal tells you people would buy through this site?)

   - **Q2: Current Buying Journey** - "Walk me through the exact steps a new client takes from first contact to receiving their product/service." (Every step. The current workaround is your real competitor.)

   - **Q3: Who Is the Real Buyer?** - "Describe your IDEAL client. Not who could buy - who SHOULD buy." (Industry, size, situation. "SMEs and enterprises" is a category, not a person.)

   - **Q4: Smallest Version That Sells** - "If the website could only do ONE thing, what would generate the most revenue?" (Show catalog / capture quotes / schedule calls / show testimonials - pick ONE.)

   - **Q5: Positioning** - "Complete this sentence: '[Company] is the only [category] in [market] that _________.'" (If they can't fill the blank, they have a positioning problem before a website problem.)

3. **For each answer**, push for specificity:
   - "Name a specific person/company" not "some clients"
   - "Show me the money" - demand costs something (money, time, panic)
   - If they can't answer: "Write 'NEED TO ASK' - don't guess"

4. **After the 5 questions**, generate a diagnostic document (use docx skill):
   - Include all questions with the user's answers
   - Add a priority table: which questions need boss/client input
   - Save to `/home/z/my-project/download/`

5. **Deliver the assignment**: "Answer these 5 with your [boss/client]. Then come back. We'll build a site that sells, not a site that looks nice."

### Key Rules
- Never accept vague answers. "Some customers" = no answer.
- If the user can't answer reliably, CREATE the diagnostic as a take-home document.
- The goal is specificity that separates a site that generates leads from one that sits there looking pretty.

---

## /autoplan - Full Automated Analysis & Roadmap

When the user wants action NOW. Runs a complete analysis of the current site/project and produces a prioritized roadmap.

### Process

1. **Analyze current site** (if exists):
   - Scrape the live site with `curl` or web-reader skill
   - Check: performance, SEO, mobile, accessibility, conversion CTAs
   - Score the site 0-100 across 6 dimensions: Technical, SEO, UX, Conversion, Mobile, Content
   - Reference the autoplan scoring rubric below

2. **Analyze the project codebase** (if exists):
   - Read all source files in the project directory
   - Check: component structure, code quality, missing features
   - Identify what's built vs. what's missing

3. **Run competitive analysis** (use web-search skill):
   - Search for the top 3-5 competitors in the same market
   - Note what they do well and badly
   - Find gaps OnlyCH (or the project) can exploit

4. **Generate the roadmap** - a prioritized list of actions grouped by impact:

   **P0 - Critical (Do First)**: Things that are actively losing customers
   - Examples: No product catalog, no WhatsApp CTA, not found on Google

   **P1 - High Impact (Do Next)**: Things that will significantly increase conversions
   - Examples: Hero section with clear value prop, client logos, product categories

   **P2 - Medium Impact (Do Soon)**: Things that build trust and credibility
   - Examples: Testimonials, case studies, brand story

   **P3 - Nice to Have (Later)**: Polish and optimization
   - Examples: Animations, blog, advanced SEO

5. **Generate the report** (use pdf or docx skill):
   - Title: "[Project] Autoplan Analysis"
   - Sections: Executive Summary, Current State Score, Competitive Landscape, Prioritized Roadmap, Next Actions
   - Save to `/home/z/my-project/download/`

### Autoplan Scoring Rubric (0-100)

| Dimension | Weight | What to Check |
|-----------|--------|---------------|
| Technical | 20% | HTTPS, load speed, broken links, mobile viewport, console errors, security |
| SEO | 20% | Meta tags, headings structure, sitemap, robots.txt, schema, Google indexing |
| UX | 20% | Navigation, readability, visual hierarchy, consistency, mobile menu |
| Conversion | 20% | CTAs, contact methods, value proposition, trust signals, friction points |
| Mobile | 10% | Responsive design, touch targets, font sizes, mobile navigation |
| Content | 10% | Copy quality, images, brand consistency, freshness |

---

## /plan-ceo-review - Strategy & Scope Review

Validates the project direction with a CEO-friendly scoring system.

### Process

1. **Score the current state** across 10 dimensions (1-10 each):
   - Value Proposition Clarity
   - Target Audience Specificity
   - Competitive Differentiation
   - Conversion Path Design
   - Content Strategy
   - Brand Consistency
   - Technical Foundation
   - SEO Readiness
   - Mobile Experience
   - Scalability

2. **Calculate overall score** (average × 10 = score out of 100)

3. **Generate a one-page CEO brief** (use docx skill):
   - Score with visual indicator (red <40, yellow 40-70, green >70)
   - Top 3 strengths
   - Top 3 critical gaps
   - 3 recommended next actions with expected impact
   - Time estimate for each action

4. **Present to user**: "Here's where you stand. The CEO review scored X/100. The #1 gap is [gap]. Here's what to fix first."

---

## /plan-eng-review - Architecture & Technical Review

Reviews the technical architecture and identifies debt, risks, and optimization opportunities.

### Process

1. **Audit the codebase**:
   - Read all source files
   - Check: dependencies, bundle size, component structure, state management, API patterns
   - Identify: dead code, security risks, performance bottlenecks

2. **Generate technical review**:
   - Architecture assessment (current stack, suitability)
   - Performance metrics (bundle size, render patterns)
   - Security checklist
   - Scalability concerns
   - Recommended refactors (prioritized by risk)

3. **Present findings** with clear action items

---

## /design-consultation - Design System & UX Strategy

Helps establish or refine the visual direction and design system.

### Process

1. **Audit current design**:
   - Extract colors, fonts, spacing from existing code
   - Check consistency across components
   - Identify brand alignment issues

2. **Define or refine design system**:
   - Color palette (primary, secondary, accent, neutrals)
   - Typography scale (headings, body, captions)
   - Spacing system (4px/8px grid)
   - Component patterns (buttons, cards, forms)
   - Icon style

3. **Generate a design tokens file** or update the project's CSS/config

4. **Provide 3 visual direction recommendations** with rationale

---

## /spec - Author a Backlog-Ready Spec

Creates a detailed specification for a feature before building it. Prevents scope creep and ensures clarity.

### Process

1. **Capture the spec** in this structure:

   ```markdown
   ## [Feature Name]

   ### Problem
   What problem does this solve? Why now?

   ### Solution
   What are we building? Be specific.

   ### User Stories
   - As a [role], I want to [action], so that [benefit]
   - ...

   ### Acceptance Criteria
   - [ ] Criterion 1
   - [ ] Criterion 2
   - ...

   ### Technical Notes
   - Implementation approach
   - Files to modify/create
   - Dependencies

   ### Out of Scope
   What we're NOT building (yet)

   ### Priority
   P0 / P1 / P2 / P3

   ### Estimated Effort
   Small (1-2h) / Medium (3-5h) / Large (1-2 days) / XL (3+ days)
   ```

2. **Save spec** to `/home/z/my-project/download/spec-[feature-name].docx`

3. **Get user confirmation** before proceeding to /build

---

## /design-shotgun - Generate Multiple Design Variants

When stuck on visual direction, generate multiple approaches and let the user pick.

### Process

1. **Identify the component/section** that needs design variants

2. **Generate 3 distinct approaches** (using image-generation skill or code):
   - Approach A: Conservative/Safe (proven patterns)
   - Approach B: Bold/Modern (current trends)
   - Approach C: Unique/Creative (differentiated)

3. **Present all 3** with pros/cons for each

4. **User picks one** (or combines elements), then proceed to /build

---

## /build - Execute a Spec Into Code

Takes a spec and builds it. The spec can come from /spec or be described inline.

### Process

1. **Confirm the spec** - What are we building? Show the acceptance criteria.

2. **For web projects**, invoke the fullstack-dev skill:
   - Set up project if needed (Next.js + TypeScript + Tailwind)
   - Build components per the spec
   - Wire up data/API if needed
   - Test locally

3. **For landing pages** (like OnlyCH), use the existing Vite+React project:
   - Create/modify components in the project directory
   - Follow existing code style and patterns
   - Ensure responsive design
   - Add proper CTAs and conversion elements

4. **After building**, run a quick self-review:
   - Does it meet all acceptance criteria?
   - Is it responsive?
   - Are CTAs functional?
   - Any console errors?

5. **Deploy if appropriate** (use /ship or manual vercel deploy)

---

## /investigate - Debug Bugs & Errors

Structured debugging approach.

### Process

1. **Reproduce the issue** - Get the exact error message or behavior
2. **Isolate the cause** - Check console, network tab, code logic
3. **Fix the bug** - Minimal change, don't refactor while debugging
4. **Verify the fix** - Test the specific scenario that was broken
5. **Document** - What was wrong, what changed, why it fixes it

---

## /review - Code Review & Diff Check

Reviews code changes before they ship.

### Process

1. **Check what changed** - Read the modified files
2. **Review against criteria**:
   - Functionality: Does it do what it's supposed to?
   - Code quality: Clean, readable, no dead code?
   - Performance: No unnecessary re-renders, lazy loading where needed?
   - Accessibility: Proper ARIA labels, semantic HTML?
   - Security: No exposed secrets, XSS risks?
3. **Give a verdict**: Ship / Fix first / Needs refactor
4. **List specific issues** with line references

---

## /design-review - Visual Polish & UX Audit

Reviews the visual output, not the code.

### Process

1. **Audit against design principles**:
   - Visual hierarchy (most important thing is most visible?)
   - Consistency (colors, fonts, spacing match the design system?)
   - Whitespace (breathing room, not cramped?)
   - Mobile experience (usable on phone-sized screens?)
   - Conversion path (clear next step at every scroll point?)

2. **Score each principle** (1-5)
3. **List specific improvements** with before/after suggestions
4. **Prioritize**: Which changes have the most visual impact?

---

## /qa - Full QA Testing

Comprehensive testing before going live.

### Process

1. **Functional testing**:
   - Every CTA works (WhatsApp link, phone link, form submission)
   - Navigation works on all screen sizes
   - All images load
   - All links work (no 404s)

2. **Cross-device testing**:
   - Mobile (375px iPhone)
   - Tablet (768px iPad)
   - Desktop (1440px)

3. **Performance**:
   - Lighthouse score (if accessible)
   - Image optimization check
   - Bundle size

4. **SEO basics**:
   - Title tag, meta description
   - Heading structure (single H1, proper hierarchy)
   - Alt text on images
   - Open Graph tags

5. **Generate QA report** with pass/fail for each item

---

## /ship - Deploy to Production

The final step. Ship it.

### Process

1. **Pre-ship checklist**:
   - [ ] All QA items pass
   - [ ] No console errors
   - [ ] All CTAs functional
   - [ ] Mobile responsive
   - [ ] Meta tags set
   - [ ] Favicon uploaded

2. **Deploy**:
   - For Vercel projects: `cd /home/z/my-project/[project] && vercel --prod`
   - For other projects: follow the project's deploy process

3. **Post-deploy verification**:
   - Visit the live URL
   - Check it loads correctly
   - Test CTAs on live site

4. **Announce**: "Shipped! Live at [URL]"

---

## /context-save - Save Project State

Saves the current session context so it can be resumed later.

### Process

1. **Capture the state** in the worklog file at `/home/z/my-project/worklog.md`:
   ```markdown
   ---
   Task ID: context-save
   Agent: main
   Task: Save project state

   Work Log:
   - Project: [name and path]
   - Current phase: [which gstack command we're on]
   - What's built: [list components/features]
   - What's pending: [list remaining tasks]
   - Key decisions: [important choices made]
   - Open questions: [unanswered questions]

   Stage Summary:
   - [key state points]
   ```

2. **Confirm with user**: "Context saved. When you come back, just say '/context-restore'."

---

## /context-restore - Resume From Saved State

Restores project context from a previous session.

### Process

1. **Read the worklog** at `/home/z/my-project/worklog.md`
2. **Read the project files** to verify current state
3. **Present the summary**: "Last time we were at [phase]. We'd built [X]. Still pending: [Y]. Want to continue from here?"

---

## Pipeline Recommendation

For a new project, the recommended sequence is:

```
/office-hours → /autoplan → /plan-ceo-review → /spec → /build → /qa → /ship
```

But the user can jump to any command at any time. If they say `/autoplan` without doing `/office-hours` first, that's fine - run autoplan with whatever info is available.

## Important Notes

- **Always respond in the user's language** (Spanish for OnlyCH project)
- **Save all deliverables** to `/home/z/my-project/download/`
- **Use appropriate skills** (docx, pdf, fullstack-dev, web-search, charts) as needed within commands
- **The worklog is critical** - always read it before starting and update it when done
- **Don't over-plan** - if the user wants to build, build. The framework guides, it doesn't block.
