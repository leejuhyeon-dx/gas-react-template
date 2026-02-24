# Phase 6: Release (Detailed Guide)

## Purpose

Ship the completed feature through proper channels with documentation and traceability.

## Pre-Release Checklist

Before creating a PR:

- [ ] Phase 5 verification complete
- [ ] All tests pass
- [ ] Lint/type checks pass
- [ ] No debug artifacts in code
- [ ] Workflow documents saved (`docs/workflow/{feature-name}/`)
- [ ] Diagrams saved (`docs/diagrams/`)

## Release Process

### Step 1: Commit Changes

Use conventional commits:

```bash
# Feature
git commit -m "feat: {description}"

# Bug fix
git commit -m "fix: {description}"

# Refactor
git commit -m "refactor: {description}"
```

### Step 2: Create Pull Request

```bash
gh pr create --title "{type}: {description}" --body "$(cat <<'EOF'
## Summary
{Brief description of changes}

## Related Issue
closes #{issue_number}

## Phases Completed
- [x] Phase 1: Requirements defined
- [x] Phase 2: Diagrams created (Use Case + Process Flow)
- [x] Phase 3: Edge cases analyzed
- [x] Phase 4: Implementation (TDD)
- [x] Phase 5: Debug & verification
- [x] Phase 6: Release

## Diagrams
- Use Case: `docs/diagrams/mermaid/{filename}.mmd`
- Process Flow: `docs/diagrams/mermaid/{filename}.mmd`

## Test Plan
- Unit tests: {count} tests
- Edge case tests: {count} tests
- Integration tests: {count} tests

## Verification
- [ ] All tests pass
- [ ] Lint passes
- [ ] All acceptance criteria met
EOF
)"
```

### Step 3: Update GitHub Project

```bash
# Read project config
cat .cursor/project.json

# Close the issue
gh issue close {issue_number} --repo {REPOSITORY}
```

### Step 4: Update Project Context

If significant decisions were made during this task, update `.cursor/CONTEXT.md`:

```markdown
## Core Decisions
- [{date}] {Decision}: {Rationale}
```

## Post-Release

### Notify Stakeholders

```
Task #{issue_number}: {title} — completed and merged.
PR: {pr_url}
```

### Clean Up

- Archive workflow documents if needed
- Update milestone progress
- Pick up next task from GitHub Project

## Release Artifacts

At the end of Phase 6, the following should exist:

```
docs/workflow/{feature-name}/
├── 01-requirements.md      # Phase 1 output
├── 02-design.md            # Phase 2 output
└── 03-edge-cases.md        # Phase 3 output

docs/diagrams/
├── mermaid/{date}-*-{feature}*.mmd     # Mermaid sources
└── plans/{date}-*-{feature}*.plan.md   # Diagram plans
```

Plus:
- Merged PR with full phase checklist
- Closed GitHub issue
- Updated project status
