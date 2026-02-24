---
name: development-workflow
description: Mandatory 6-phase development workflow. Use when starting any new feature, task, or project work. Enforces the flow - Phase 1 Requirements Definition, Phase 2 Design (Use Case + Process Flow diagrams), Phase 3 Edge Case Analysis, Phase 4 Implementation, Phase 5 Debug, Phase 6 Release. NEVER skip phases. NEVER start implementation before Phase 3 is complete.
---

# Development Workflow (6-Phase)

This skill enforces a structured 6-phase workflow for all development tasks. Every feature, bugfix, or task MUST go through all 6 phases in order.

## CRITICAL RULES

- **MANDATORY ORDER**: Phase 1 → 2 → 3 → 4 → 5 → 6 (NO SKIPPING)
- **NEVER** start coding before Phase 3 (Edge Case Analysis) is complete
- **NEVER** skip Phase 2 diagrams — visual design prevents costly rework
- **ALWAYS** get user confirmation at Phase 1, 2, and 3 before proceeding
- **VIOLATION**: Skipping any phase is a CRITICAL ERROR

## Workflow Overview

```
Phase 1: Requirements Definition
    ↓ (user confirmation required)
Phase 2: Design (Use Case Diagram + Process Flow Diagram)
    ↓ (user confirmation required)
Phase 3: Edge Case Analysis
    ↓ (user confirmation required)
Phase 4: Implementation (TDD: RED → GREEN → REFACTOR)
    ↓
Phase 5: Debug & Verification
    ↓
Phase 6: Release
```

## Phase 1: Requirements Definition

Gather and document clear requirements before any design work.

### Required Actions

1. **Ask clarifying questions:**

| Question | Purpose |
| -------- | ------- |
| What problem does this solve? | Understand the goal |
| Who are the users/stakeholders? | Define audience |
| What is the expected behavior? | Set acceptance criteria |
| What are the constraints? | Identify technical limits |
| What is the priority/deadline? | Scope the work |

2. **Document requirements** in `docs/workflow/{feature-name}/01-requirements.md`

3. **Get user confirmation** before proceeding to Phase 2

### Output

```markdown
# Requirements: {Feature Name}

## Problem Statement
{What problem does this solve?}

## Users / Stakeholders
{Who benefits from this?}

## Acceptance Criteria
- [ ] {Criterion 1}
- [ ] {Criterion 2}

## Constraints
- {Technical/business constraints}

## Out of Scope
- {Explicitly excluded items}
```

See `references/phase1-requirements.md` for detailed guide.

## Phase 2: Design

Create visual diagrams to validate the approach BEFORE writing any code.

### Required Diagrams

| Diagram | Tool | Purpose |
| ------- | ---- | ------- |
| **Use Case Diagram** | Mermaid → FigJam (via Figma MCP) | Who does what |
| **Process Flow Diagram** | Mermaid → FigJam (via Figma MCP) | How it works step-by-step |

### Process

1. Create Use Case diagram using `figjam-diagram` skill
2. Create Process Flow diagram using `figjam-diagram` skill
3. Save diagrams to `docs/diagrams/mermaid/` and `docs/diagrams/plans/`
4. **Get user confirmation** on both diagrams before proceeding

### Output

- Use Case diagram (`.mmd` file + FigJam link)
- Process Flow diagram (`.mmd` file + FigJam link)
- Design summary in `docs/workflow/{feature-name}/02-design.md`

See `references/phase2-design.md` for detailed guide.

## Phase 3: Edge Case Analysis

Identify and document edge cases BEFORE implementation.

### Required Actions

1. Review requirements and diagrams from Phase 1-2
2. Identify edge cases by category:

| Category | Examples |
| -------- | -------- |
| Input validation | Empty, null, overflow, special chars |
| Boundary conditions | Min/max values, empty lists, single item |
| Error states | Network failure, timeout, permission denied |
| Concurrency | Race conditions, duplicate requests |
| Security | Injection, unauthorized access, data leaks |

3. Document each edge case with expected behavior
4. **Get user confirmation** — decide which edge cases to handle

### Output

Document in `docs/workflow/{feature-name}/03-edge-cases.md`

```markdown
# Edge Cases: {Feature Name}

## Must Handle (Critical)
| # | Edge Case | Expected Behavior | Priority |
|---|-----------|-------------------|----------|
| 1 | {case} | {behavior} | Critical |

## Should Handle (Important)
| # | Edge Case | Expected Behavior | Priority |
|---|-----------|-------------------|----------|
| 1 | {case} | {behavior} | High |

## Won't Handle (Deferred)
| # | Edge Case | Reason for Deferral |
|---|-----------|---------------------|
| 1 | {case} | {reason} |
```

See `references/phase3-edge-cases.md` for detailed guide.

## Phase 4: Implementation

Write code using TDD (Test-Driven Development).

### Process

```
4.1 Write tests based on requirements + edge cases (RED)
    ↓
4.2 Implement minimum code to pass tests (GREEN)
    ↓
4.3 Refactor while keeping tests green (REFACTOR)
```

### Rules

- Write tests FIRST — covering acceptance criteria AND edge cases from Phase 3
- Implement the MINIMUM code to pass tests
- Refactor only after all tests pass
- Run `{test_command}` after each step
- Run `{lint_command}` during refactoring

### Output

- Test files covering all acceptance criteria and critical edge cases
- Implementation code
- All tests passing

See `references/phase4-implementation.md` for detailed guide.

## Phase 5: Debug & Verification

Verify the implementation is correct and complete.

### Checklist

- [ ] All tests pass: `{test_command}`
- [ ] Lint passes: `{lint_command}`
- [ ] All acceptance criteria from Phase 1 are met
- [ ] Critical edge cases from Phase 3 are handled
- [ ] No regressions in existing functionality
- [ ] Code review self-check (clean code, no debug artifacts)

### If Issues Found

1. Write a failing test that reproduces the issue
2. Fix the issue
3. Verify the test passes
4. Re-run full test suite

See `references/phase5-debug.md` for detailed guide.

## Phase 6: Release

Prepare and ship the completed work.

### Checklist

- [ ] All Phase 5 checks pass
- [ ] Update CHANGELOG/release notes if applicable
- [ ] Create PR with proper description (reference issue)
- [ ] Update GitHub Project status
- [ ] Close related issue(s)

### PR Description Template

```markdown
## Summary
{Brief description of changes}

## Related Issue
closes #{issue_number}

## Phases Completed
- [x] Phase 1: Requirements defined
- [x] Phase 2: Diagrams created
- [x] Phase 3: Edge cases analyzed
- [x] Phase 4: Implementation (TDD)
- [x] Phase 5: Debug & verification
- [x] Phase 6: Release

## Test Plan
- {How to verify this works}
```

See `references/phase6-release.md` for detailed guide.

## File Organization

```
docs/workflow/{feature-name}/
├── 01-requirements.md
├── 02-design.md
└── 03-edge-cases.md

docs/diagrams/
├── mermaid/          # Mermaid source files (.mmd)
└── plans/            # Diagram plans (.plan.md)
```

## Quick Reference

| Phase | Gate | Output |
| ----- | ---- | ------ |
| 1. Requirements | User confirms requirements | `01-requirements.md` |
| 2. Design | User confirms diagrams | Use Case + Process Flow diagrams |
| 3. Edge Cases | User confirms edge case list | `03-edge-cases.md` |
| 4. Implementation | All tests pass | Code + tests |
| 5. Debug | Full verification passes | Verified code |
| 6. Release | PR merged | Shipped feature |

## Detailed References

- Phase 1 details: `references/phase1-requirements.md`
- Phase 2 details: `references/phase2-design.md`
- Phase 3 details: `references/phase3-edge-cases.md`
- Phase 4 details: `references/phase4-implementation.md`
- Phase 5 details: `references/phase5-debug.md`
- Phase 6 details: `references/phase6-release.md`
