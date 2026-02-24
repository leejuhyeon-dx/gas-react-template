# Phase 3: Edge Case Analysis (Detailed Guide)

## Purpose

Identify potential failure points and boundary conditions BEFORE writing any code. This prevents bugs, improves test coverage, and produces more robust implementations.

## Process

### Step 1: Review Phase 1-2 Outputs

Before analyzing edge cases, review:
- Requirements document (`01-requirements.md`)
- Use Case diagram (all actor interactions)
- Process Flow diagram (every decision point = potential edge case)

### Step 2: Systematic Edge Case Discovery

Walk through each category:

#### Input Validation
| Pattern | Questions to Ask |
| ------- | ---------------- |
| Empty/null | What if the input is empty, null, or undefined? |
| Type mismatch | What if string is given instead of number? |
| Overflow | What if the value exceeds max size/length? |
| Special characters | What about unicode, emoji, HTML, SQL? |
| Encoding | What about different character encodings? |

#### Boundary Conditions
| Pattern | Questions to Ask |
| ------- | ---------------- |
| Min/max values | What at exactly 0, 1, MAX_INT? |
| Empty collections | What if the list/array is empty? |
| Single item | What if there's exactly one item? |
| Pagination | What about first page, last page, beyond last? |
| Timestamps | What about timezone differences, DST? |

#### Error States
| Pattern | Questions to Ask |
| ------- | ---------------- |
| Network failure | What if the API/DB is unreachable? |
| Timeout | What if the operation takes too long? |
| Permission denied | What if the user lacks authorization? |
| Resource not found | What if the referenced item was deleted? |
| Partial failure | What if only part of a batch operation fails? |

#### Concurrency
| Pattern | Questions to Ask |
| ------- | ---------------- |
| Race conditions | What if two requests arrive simultaneously? |
| Duplicate requests | What if the user double-clicks submit? |
| Stale data | What if data changed between read and write? |
| Lock contention | What if a resource is locked by another process? |

#### Security
| Pattern | Questions to Ask |
| ------- | ---------------- |
| Injection | Can user input be used in queries/commands? |
| Authentication | What if the session/token is expired? |
| Authorization | Can users access other users' data? |
| Data exposure | Are sensitive fields properly hidden? |

### Step 3: Prioritize Edge Cases

Categorize each discovered edge case:

| Priority | Criteria | Action |
| -------- | -------- | ------ |
| **Critical** | Data loss, security breach, crash | MUST handle in Phase 4 |
| **High** | Bad UX, incorrect behavior | SHOULD handle in Phase 4 |
| **Medium** | Minor inconvenience, rare occurrence | Handle if time permits |
| **Low** | Cosmetic, extremely unlikely | Defer to future iteration |

### Step 4: Document Edge Cases

Create `docs/workflow/{feature-name}/03-edge-cases.md`:

```markdown
---
feature: {feature-name}
phase: 3-edge-cases
created: {YYYY-MM-DD}
status: draft
---

# Edge Cases: {Feature Name}

## Source Analysis
- Requirements: `docs/workflow/{feature-name}/01-requirements.md`
- Process Flow: `docs/diagrams/mermaid/{filename}.mmd`
- Decision points analyzed: {count}

## Critical (Must Handle)

| # | Category | Edge Case | Expected Behavior | Test Strategy |
|---|----------|-----------|-------------------|---------------|
| 1 | Input | Empty email on registration | Show validation error | Unit test |
| 2 | Security | SQL injection in search | Sanitize input, reject | Unit test |

## High (Should Handle)

| # | Category | Edge Case | Expected Behavior | Test Strategy |
|---|----------|-----------|-------------------|---------------|
| 1 | Network | API timeout on payment | Retry with backoff | Integration test |

## Medium (Nice to Have)

| # | Category | Edge Case | Expected Behavior | Test Strategy |
|---|----------|-----------|-------------------|---------------|
| 1 | UX | Very long username | Truncate display | Unit test |

## Deferred (Won't Handle Now)

| # | Category | Edge Case | Reason |
|---|----------|-----------|--------|
| 1 | Concurrency | Simultaneous edits | Requires WebSocket (future) |

## Test Coverage Summary
- Critical edge cases: {count} → ALL must have tests
- High edge cases: {count} → Target 100% coverage
- Medium edge cases: {count} → Cover if time permits
- Total test cases needed: {count}
```

### Step 5: Get Confirmation

```markdown
Here are the edge cases I've identified:

**Critical ({count}):** {summary}
**High ({count}):** {summary}
**Medium ({count}):** {summary}
**Deferred ({count}):** {summary}

Before we start implementation:
1. Are there edge cases I missed?
2. Do you agree with the prioritization?
3. Should any deferred cases be promoted?
4. Ready to proceed to implementation?
```

## Confirmation Gate

**DO NOT proceed to Phase 4 until the user confirms the edge case analysis.**

## Tips

- Every decision diamond in the Process Flow diagram = at least one edge case
- Think about what happens BETWEEN steps, not just at each step
- Critical edge cases become test cases in Phase 4
- If you find too many edge cases, the feature might need to be split
