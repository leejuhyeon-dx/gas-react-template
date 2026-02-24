---
name: skill-creator
description: Guide for creating and editing skills. Use when users want to create a new skill, update an existing skill, or learn about skill structure and best practices.
---

# Skill Creator

Guide for creating effective Claude Code skills in this project.

## Skill Anatomy

```
skill-name/
  SKILL.md           # Required - Main instructions
  references/        # Optional - Detailed docs
    *.md
```

## SKILL.md Template

```yaml
---
name: skill-name
description: One-line description. When to use this skill.
---

# Skill Title

Brief overview (2-3 lines)

## Quick Reference

Most frequently used commands or rules

## Workflow

Step-by-step process

## Critical Rules

Must-follow constraints

## Detailed References

- Details: `references/{file}.md`
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase, hyphens only (max 64 chars) |
| `description` | Yes | What it does + when to use. Third-person style. |

## Creation Process

### Step 1: Define Purpose

1. What task does this skill help with?
2. When should Claude use this skill?
3. What makes this non-obvious to Claude?

### Step 2: Structure Content

**Progressive disclosure:**
1. **SKILL.md** - Core workflow (<5k words)
2. **references/** - Detailed docs (loaded as needed)

### Step 3: Create Files

```bash
mkdir -p .cursor/skills/{skill-name}/references
touch .cursor/skills/{skill-name}/SKILL.md
```

### Step 4: Validate

- [ ] YAML frontmatter has `name` and `description`
- [ ] Description explains when to use the skill
- [ ] No hardcoded absolute paths
- [ ] All referenced files exist
- [ ] Imperative form ("Do X" not "You should X")

## Writing Style

- **Imperative form**: "Run the command" not "You should run"
- **Concise**: Skip obvious information
- **Structured**: Use tables, lists, code blocks
