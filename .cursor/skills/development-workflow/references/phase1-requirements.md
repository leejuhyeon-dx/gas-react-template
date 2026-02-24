# Phase 1: Requirements Definition (Detailed Guide)

## Purpose

Establish clear, unambiguous requirements before any design or implementation work begins. This phase prevents costly rework by ensuring alignment between the developer and stakeholders.

## Process

### Step 1: Gather Context

Before asking questions, review available information:

```bash
# Check related issues
gh issue list -R {REPOSITORY} --label "related-label"

# Read existing docs
ls docs/workflow/
```

### Step 2: Requirements Consultation

Ask these questions systematically:

```markdown
Let's define the requirements for this task:

1. **What problem does this solve?**
   - What pain point or need does this address?

2. **Who are the target users?**
   - End users? Internal team? API consumers?

3. **What is the expected behavior?**
   - Describe the happy path step by step

4. **What are the inputs and outputs?**
   - What data goes in? What comes out?

5. **What are the constraints?**
   - Performance? Compatibility? Dependencies?

6. **What is explicitly out of scope?**
   - What should NOT be included in this task?
```

### Step 3: Document Requirements

Create `docs/workflow/{feature-name}/01-requirements.md`:

```markdown
---
feature: {feature-name}
phase: 1-requirements
created: {YYYY-MM-DD}
status: draft
---

# Requirements: {Feature Name}

## Problem Statement
{Clear description of the problem being solved}

## Users / Stakeholders
- Primary: {who will use this directly}
- Secondary: {who is affected indirectly}

## Functional Requirements
1. {FR-1}: {description}
2. {FR-2}: {description}

## Non-Functional Requirements
- Performance: {if applicable}
- Security: {if applicable}
- Compatibility: {if applicable}

## Acceptance Criteria
- [ ] AC-1: {Given X, When Y, Then Z}
- [ ] AC-2: {Given X, When Y, Then Z}

## Constraints
- {Technical constraints}
- {Business constraints}

## Out of Scope
- {Items explicitly excluded}

## Open Questions
- {Any unresolved questions}
```

### Step 4: Get Confirmation

Present the documented requirements to the user:

```markdown
Here are the requirements I've documented:

[Show requirements summary]

Before we move to the Design phase:
1. Are these requirements accurate and complete?
2. Are the acceptance criteria clear enough?
3. Anything to add or modify?
```

## Confirmation Gate

**DO NOT proceed to Phase 2 until the user confirms requirements are correct.**

If the user has changes:
1. Update the requirements document
2. Re-present for confirmation
3. Repeat until confirmed

## Tips

- Be specific — "fast" is not a requirement; "responds within 200ms" is
- Use "Given/When/Then" format for acceptance criteria
- If scope is too large, suggest breaking into smaller tasks
- Document what is OUT of scope to prevent scope creep
