---
name: figjam-diagram
description: FigJam diagram creation via Figma MCP only. MANDATORY 7-step consultation. MUST call Figma MCP generate_diagram in Step 6. NEVER deliver only Mermaid file. NEVER skip requirements consultation. NEVER call generate_diagram before user confirmation. ALWAYS ask for feedback after FigJam creation (Step 7). Use when user asks to create diagram, draw flowchart, sequence diagram, visualize architecture, or any diagram-related requests. Also used in Phase 2 of the development-workflow skill.
---

# FigJam Diagram Guide

This skill provides a structured 7-step consultation process for creating FigJam diagrams using Figma MCP's `generate_diagram` tool.

## CRITICAL RULES

### Figma MCP is MANDATORY

**YOU MUST** use Figma MCP to create the diagram. There is no alternative.

- **MUST** call Figma MCP `generate_diagram` tool in Step 6. Every diagram request ends with a FigJam link from this tool.
- **DO NOT** finish diagram creation without calling `generate_diagram`. Delivering only a Mermaid file or a link to Mermaid Live Editor is **NOT** acceptable.
- **DO NOT** skip Step 6. Step 6 = call Figma MCP -> get FigJam URL -> show URL to user.

### When You May Call generate_diagram

**DO NOT** call `generate_diagram` tool until:
1. Requirements consultation is COMPLETED (Step 1)
2. User has CONFIRMED the plan (Step 4)
3. Mermaid code is SAVED to file (Step 5)

**MANDATORY ORDER**: Step 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 (NO SKIPPING ALLOWED)

**VIOLATION**: Skipping any step is a CRITICAL ERROR. Finishing without calling Figma MCP is a CRITICAL ERROR.

## When to Use

Use this skill when:
- User requests any type of diagram creation
- User mentions: flowchart, sequence diagram, state diagram, gantt chart
- User wants to visualize processes, architecture, or workflows
- Phase 2 of `development-workflow` skill requires diagram creation

## 7-Step Consultation Process

```
1. Requirements Consultation -> 2. Diagram Type Selection -> 3. Mermaid Plan Creation
                                                                        |
7. Feedback Request <- 6. FigJam Creation <- 5. Mermaid Generation <- 4. Plan Review & Confirmation
```

### Step 1: Requirements Consultation (REQUIRED)

Before creating any diagram, gather essential information:

| Question | Purpose |
| -------- | ------- |
| What is the purpose of this diagram? | Understand the goal |
| Who is the target audience? | Determine complexity level |
| What outcome do you expect? | Set clear expectations |

### Step 2: Diagram Type Selection

Based on requirements, recommend appropriate diagram type:

| Diagram Type | Best For |
| ------------ | -------- |
| Flowchart | Process flows, decision trees, workflows |
| Sequence Diagram | API calls, system interactions, message flows |
| State Diagram | State machines, lifecycle, status transitions |
| Gantt Chart | Project schedules, timelines, milestones |

### Step 3: Mermaid Plan Creation

Create a plan for the Mermaid code based on:
- User's context and requirements
- Selected diagram type
- Key elements to include

### Step 4: Plan Review & Confirmation

Present the plan to user and:
- Ask for confirmation
- Clarify any ambiguous points
- Make adjustments if needed

### Step 5: Mermaid Generation

Write the final Mermaid.js code following Figma MCP rules.

### Step 6: FigJam Creation (Figma MCP REQUIRED)

**You MUST use Figma MCP.** Call the `generate_diagram` tool (Figma MCP), then provide the returned FigJam URL to the user.

- **Required**: Invoke Figma MCP -> `generate_diagram` with `name`, `mermaidSyntax`, `userIntent`.
- **Forbidden**: Ending with only a `.mmd` file or a Mermaid Live Editor link. The deliverable is the FigJam URL from Figma MCP.

### Step 7: Feedback Request (REQUIRED)

After showing the FigJam URL, **always** ask the user for feedback to improve future diagrams:

| Question | Purpose |
| -------- | ------- |
| What is the most unsatisfying thing about the diagram generated in FigJam? | Identify UI/UX pain points |
| Is there anything you'd like to change (layout, colors, labels)? | Gather improvement requests |
| Any other feedback for the next diagram? | Capture general preferences |

Offer to iterate (adjust Mermaid, regenerate) based on feedback.

## Decision Node Styling (Flowcharts)

For flowcharts with decision nodes (diamond / if-branches), **use color to distinguish outcomes**:

| Outcome | Color | Use for |
| ------- | ----- | ------- |
| **Positive** (Yes, OK, Success) | Green | Favorable/expected path |
| **Negative** (No, Error, Fail) | Red or orange | Unfavorable/exception path |
| **Default/Neutral** | Default (no class) | General process nodes |

Apply via `classDef` and `:::className` on nodes; link labels (e.g. `-->|"Yes"|`) lead to positive/negative nodes. See `references/mermaid-syntax.md` for examples.

## Supported Diagram Types

- **graph/flowchart**: Process flows, decision trees
- **sequenceDiagram**: System interactions, API flows
- **stateDiagram/stateDiagram-v2**: State machines, lifecycles
- **gantt**: Project schedules, timelines

**NOT Supported**: class diagrams, timelines, venn diagrams, ER diagrams

## File Paths & Naming Convention

### Directory Structure

```
docs/diagrams/
  mermaid/          # Mermaid source files
    {file}.mmd
  plans/            # Diagram plans
    {file}.plan.md
```

### Naming Convention

| File Type | Pattern | Example |
| --------- | ------- | ------- |
| Mermaid | `{YYYY-MM-DD}-{type}-{description}.mmd` | `2024-01-31-flowchart-user-registration.mmd` |
| Plan | `{YYYY-MM-DD}-{type}-{description}.plan.md` | `2024-01-31-flowchart-user-registration.plan.md` |

### Type Abbreviations

| Diagram Type | Abbreviation |
| ------------ | ------------ |
| Flowchart/Graph | `flowchart` |
| Sequence Diagram | `sequence` |
| State Diagram | `state` |
| Gantt Chart | `gantt` |

### Description Rules

- Use kebab-case (lowercase with hyphens)
- Keep it short but descriptive (2-4 words)
- Examples: `user-login`, `order-processing`, `sprint-timeline`

## Quick Reference (Step 6 ONLY)

**WARNING**: Only use AFTER completing Steps 1-5 and receiving user confirmation.

```javascript
CallMcpTool({
  server: "user-Figma",
  toolName: "generate_diagram",
  arguments: {
    name: "Diagram Title",
    mermaidSyntax: "flowchart LR\n  A[\"Start\"] --> B[\"End\"]",
    userIntent: "Description of user's goal"
  }
})
```

**IMPORTANT**:
- After calling `generate_diagram`, you MUST show the returned URL as a markdown link to the user.
- **NEVER call this before Step 4 (Plan Review & Confirmation) is complete.**

## Detailed References

- Consultation process: `references/consultation-process.md`
- Diagram types guide: `references/diagram-types.md`
- Mermaid syntax rules: `references/mermaid-syntax.md`
- Figma MCP usage: `references/figma-mcp-usage.md`
- File conventions: `references/file-conventions.md`
