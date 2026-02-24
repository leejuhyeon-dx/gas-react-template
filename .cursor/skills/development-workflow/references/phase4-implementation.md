# Phase 4: Implementation (Detailed Guide)

## Purpose

Implement the feature using TDD (Test-Driven Development), guided by the requirements, diagrams, and edge cases from Phases 1-3.

## Prerequisites

Before starting implementation, verify:
- [ ] Phase 1: Requirements confirmed by user
- [ ] Phase 2: Both diagrams confirmed by user
- [ ] Phase 3: Edge cases confirmed by user

## TDD Cycle: RED → GREEN → REFACTOR

```
4.1 Write Tests (RED)
    - Tests fail because code doesn't exist yet
    ↓
4.2 Implement (GREEN)
    - Write minimum code to pass tests
    ↓
4.3 Refactor (REFACTOR)
    - Clean up while keeping tests green
    ↓
Repeat for next feature slice
```

## Step 4.1: Write Tests (RED)

### Test Plan

Create tests based on Phase 1-3 outputs:

| Source | Becomes |
| ------ | ------- |
| Acceptance criteria (Phase 1) | Happy path tests |
| Process flow steps (Phase 2) | Integration tests |
| Critical edge cases (Phase 3) | Edge case unit tests |
| High edge cases (Phase 3) | Additional unit tests |

### Test Structure

```
tests/
├── {feature}/
│   ├── {feature}.test.ts        # Unit tests
│   ├── {feature}.edge.test.ts   # Edge case tests
│   └── {feature}.integration.test.ts  # Integration tests
```

### Writing Tests

Write tests BEFORE implementation:

```typescript
describe('{Feature Name}', () => {
  // From Phase 1: Acceptance Criteria
  describe('happy path', () => {
    it('AC-1: should {expected behavior}', () => {
      // Arrange
      const input = { /* from requirements */ };
      // Act
      const result = featureFunction(input);
      // Assert
      expect(result).toBe(/* expected */);
    });
  });

  // From Phase 3: Critical Edge Cases
  describe('edge cases', () => {
    it('should handle empty input', () => {
      expect(() => featureFunction(null)).toThrow('Invalid input');
    });
  });
});
```

### Verify RED

```bash
{test_command}  # All new tests should FAIL
```

## Step 4.2: Implement (GREEN)

### Rules

- Write the MINIMUM code to make tests pass
- Follow the Process Flow diagram from Phase 2 as the implementation guide
- Do NOT add features or optimizations not covered by tests
- Do NOT handle edge cases not in your test plan

### Verify GREEN

```bash
{test_command}  # All tests should PASS
```

## Step 4.3: Refactor

### Rules

- Only refactor AFTER all tests pass
- Keep running tests during refactoring
- Improve code quality without changing behavior:
  - Extract common logic
  - Rename for clarity
  - Remove duplication
  - Simplify conditionals

### Verify REFACTOR

```bash
{test_command}   # Tests still pass
{lint_command}   # Code style passes
```

## Test Types by Code

| Code Type | Test Approach | Example |
| --------- | ------------- | ------- |
| Pure functions | Unit TDD | Validators, formatters |
| Service logic | Unit TDD | Business rules |
| API routes | Integration | HTTP request/response |
| Database ops | Integration | CRUD operations |
| UI components | Component test | Render + interaction |
| Full workflows | E2E | User journey |

## Iteration

If the feature is large, break it into slices:

```
Slice 1: Core happy path
  RED → GREEN → REFACTOR

Slice 2: Secondary paths
  RED → GREEN → REFACTOR

Slice 3: Edge case handling
  RED → GREEN → REFACTOR
```

## Output

At the end of Phase 4:
- All acceptance criteria tests pass
- All critical edge case tests pass
- Code is clean and well-structured
- No debug artifacts (console.log, TODO hacks)
