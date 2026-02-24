# PR Workflow

## Creating a PR

```bash
gh pr create --title "{type}: {description}" --body "$(cat <<'EOF'
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
EOF
)"
```

## Merge Strategies

```bash
gh pr merge --squash      # Preferred - clean history
gh pr merge --merge       # Merge commit
gh pr merge --rebase      # Rebase merge
```

## Review Checklist

Before merging:
- [ ] All CI checks pass
- [ ] All 6 phases completed
- [ ] Tests cover acceptance criteria and edge cases
- [ ] No debug artifacts in code
- [ ] PR description is complete
