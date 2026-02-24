# Phase 5: Debug & Verification (Detailed Guide)

## Purpose

Ensure the implementation is correct, complete, and ready for release. This phase catches issues that slipped through Phase 4.

## Verification Checklist

### 1. Test Suite

```bash
# Run full test suite
{test_command}

# Run with coverage (if available)
{test_command} --coverage
```

**Pass criteria:**
- [ ] All tests pass (0 failures)
- [ ] No skipped tests that should be active
- [ ] Coverage meets project threshold

### 2. Code Quality

```bash
# Run linter
{lint_command}

# Type check (if applicable)
{typecheck_command}
```

**Pass criteria:**
- [ ] No lint errors
- [ ] No type errors
- [ ] No warnings that indicate real issues

### 3. Acceptance Criteria Walkthrough

Review each acceptance criterion from Phase 1:

| AC | Description | Status | Evidence |
|----|-------------|--------|----------|
| AC-1 | {description} | PASS/FAIL | {test name or manual check} |
| AC-2 | {description} | PASS/FAIL | {test name or manual check} |

### 4. Edge Case Coverage

Review critical edge cases from Phase 3:

| Edge Case | Test Exists | Test Passes |
|-----------|-------------|-------------|
| {case 1} | YES/NO | PASS/FAIL |
| {case 2} | YES/NO | PASS/FAIL |

### 5. Regression Check

- [ ] Existing tests still pass (no regressions)
- [ ] No unintended side effects on existing features
- [ ] API contracts unchanged (unless intentional)

### 6. Code Self-Review

- [ ] No debug code left (console.log, debugger, TODO hacks)
- [ ] No commented-out code
- [ ] No hardcoded values that should be configurable
- [ ] No security vulnerabilities (OWASP top 10)
- [ ] Error messages are clear and actionable

## Bug Fix Flow (When Issues Found)

If Phase 5 reveals issues:

```
1. Write a failing test that reproduces the bug
    ↓
2. Fix the code to make the test pass
    ↓
3. Re-run full test suite to check for regressions
    ↓
4. Repeat verification checklist
```

### Bug Categories

| Type | Priority | Action |
| ---- | -------- | ------ |
| Acceptance criteria not met | Blocker | Fix immediately |
| Critical edge case not handled | Blocker | Fix immediately |
| Test coverage gap | High | Add test + fix |
| Code quality issue | Medium | Fix in refactor |
| Minor cosmetic issue | Low | Fix if time permits |

## Output

At the end of Phase 5:
- All verification checks pass
- No known blockers
- Ready for Phase 6 (Release)
