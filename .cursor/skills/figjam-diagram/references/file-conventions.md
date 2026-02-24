# File Conventions

Guidelines for storing and naming diagram-related files.

## Directory Structure

```
docs/diagrams/
  mermaid/              # Mermaid source files (.mmd)
    2024-01-31-flowchart-user-registration.mmd
    2024-02-15-sequence-api-auth.mmd
  plans/                # Diagram plan files (.plan.md)
    2024-01-31-flowchart-user-registration.plan.md
    2024-02-15-sequence-api-auth.plan.md
```

## Naming Convention

### Pattern

```
{YYYY-MM-DD}-{type}-{description}.{extension}
```

### Components

| Component | Description | Example |
| --------- | ----------- | ------- |
| `YYYY-MM-DD` | Creation date | `2024-01-31` |
| `type` | Diagram type abbreviation | `flowchart`, `sequence`, `state`, `gantt` |
| `description` | Brief description in kebab-case | `user-registration`, `order-processing` |
| `extension` | File type | `.mmd` for Mermaid, `.plan.md` for plans |

### Description Guidelines

- **Use kebab-case**: lowercase letters with hyphens
- **Keep it short**: 2-4 words maximum
- **Be descriptive**: convey the diagram's purpose

**Good**: `user-registration`, `api-auth-flow`, `order-state-machine`
**Bad**: `UserRegistration` (not kebab-case), `flow` (too vague)

## File Contents

### Mermaid File (.mmd)

```markdown
---
title: User Registration Flow
type: flowchart
created: 2024-01-31
figjam_url: https://www.figma.com/board/...
---

flowchart LR
    A["Start"] --> B["Input Email"]
    ...
```

### Plan File (.plan.md)

```markdown
---
title: User Registration Flow
type: flowchart
created: 2024-01-31
status: completed
---

# Diagram Plan: User Registration Flow

## Requirements
- Purpose: Document the user registration process
- Audience: Development team

## Key Elements
1. Start - User initiates registration
2. Email Input - User enters email address

## Relationships/Flow
- Start -> Email Input: User action
```

## Directory Creation

```bash
mkdir -p docs/diagrams/mermaid
mkdir -p docs/diagrams/plans
```
