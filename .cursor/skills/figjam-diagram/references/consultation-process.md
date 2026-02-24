# Consultation Process

Detailed guide for the 7-step consultation process when creating FigJam diagrams.

## CRITICAL: MANDATORY ORDER

**YOU MUST FOLLOW THIS ORDER. NO EXCEPTIONS.**

```
Step 1 -> Step 2 -> Step 3 -> Step 4 -> Step 5 -> Step 6 -> Step 7
```

- **NEVER** skip Step 1 (Requirements Consultation)
- **NEVER** call `generate_diagram` before Step 4 confirmation
- **ALWAYS** save files before calling `generate_diagram`
- **ALWAYS** ask for feedback after Step 6 (Step 7)

---

## Step 1: Requirements Consultation

**Purpose**: Understand what the user needs before creating any diagram.

### Essential Questions

```markdown
1. What is the purpose of this diagram?
   - Documentation? Presentation? Planning?

2. Who is the target audience?
   - Technical team? Stakeholders? End users?

3. What do you expect as the final result?
   - Simple overview? Detailed process? Decision tree?

4. Do you have any existing context or materials?
   - Code? Documents? Existing diagrams?
```

### Gathering Context

If user provides code or documentation:
- Analyze the structure and flow
- Identify key components and relationships
- Note any dependencies or sequences

## Step 2: Diagram Type Selection

**Purpose**: Choose the most appropriate diagram type for the requirements.

### Selection Criteria

| Requirement | Recommended Diagram |
| ----------- | ------------------- |
| Show process steps | Flowchart |
| Show decisions/branches | Flowchart with decision nodes |
| Show system interactions | Sequence Diagram |
| Show message flow between components | Sequence Diagram |
| Show state transitions | State Diagram |
| Show lifecycle stages | State Diagram |
| Show project timeline | Gantt Chart |
| Show task dependencies | Gantt Chart |

### Consultation Script

```markdown
Based on your requirements, I recommend a [Diagram Type] because:
- [Reason 1]
- [Reason 2]

Would you like to proceed with this type, or would you prefer a different approach?
```

## Step 3: Mermaid Plan Creation

**Purpose**: Create a detailed plan before writing the actual Mermaid code.

### Save Plan File

Create the plan file at:
```
docs/diagrams/plans/{YYYY-MM-DD}-{type}-{description}.plan.md
```

### Plan Structure

```markdown
---
title: [Descriptive title]
type: [flowchart/sequence/state/gantt]
created: [YYYY-MM-DD]
status: draft
---

# Diagram Plan: [Title]

## Requirements
- Purpose: [What this diagram is for]
- Audience: [Who will view this]
- Expected outcome: [What user expects]

## Diagram Type
[Type] - [Why this type was chosen]

## Key Elements
1. [Element 1] - [Description]
2. [Element 2] - [Description]

## Relationships/Flow
- [Element 1] -> [Element 2]: [Relationship description]

## Notes
- [Any special considerations]
- [Styling preferences]
```

## Step 4: Plan Review & Confirmation

**Purpose**: Ensure the plan meets user expectations before implementation.

### Confirmation Script

```markdown
Here's the plan for your diagram:

[Show the plan]

Before I create this diagram:
1. Does this capture all the elements you need?
2. Are there any relationships I should add or modify?
3. Any other changes or additions?
```

## Step 5: Mermaid Generation

**Purpose**: Write the final Mermaid.js code based on the confirmed plan.

### Save Mermaid File

```
docs/diagrams/mermaid/{YYYY-MM-DD}-{type}-{description}.mmd
```

### File Structure

```markdown
---
title: [Descriptive title]
type: [flowchart/sequence/state/gantt]
created: [YYYY-MM-DD]
figjam_url: [Will be added after Step 6]
---

[Mermaid code here]
```

## Step 6: FigJam Creation (Figma MCP REQUIRED)

**Figma MCP is MANDATORY.** Call `generate_diagram`, then present the URL.

### Response Template

```markdown
I've created your diagram!

[View your diagram in FigJam]({returned_url})

**Files saved:**
- Plan: `docs/diagrams/plans/{filename}.plan.md`
- Mermaid: `docs/diagrams/mermaid/{filename}.mmd`
```

## Step 7: Feedback Request (REQUIRED)

**Always** ask after showing the FigJam URL:

```markdown
To improve future diagrams, I'd like your feedback:

1. What is the most unsatisfying thing about the diagram generated in FigJam?
2. Is there anything you'd like to change (layout, colors, labels)?
3. Any other feedback for the next diagram?

I can iterate on this diagram or apply your feedback to the next one.
```

### Update Mermaid File

After successful FigJam creation, update the Mermaid file's frontmatter:

```yaml
---
figjam_url: {returned_url}
---
```
