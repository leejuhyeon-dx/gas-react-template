---
name: project-management
description: GitHub Project workflow guide. Includes issue creation, PR workflow, labels usage. Use when creating/updating issues, managing PRs, or tracking milestones.
---

# Project Management Guide

This project uses GitHub Projects for task tracking and workflow management.

## Quick Reference

### Creating Issues

```bash
# Feature request
gh issue create --label "type:feature" --repo {REPOSITORY}

# Bug report
gh issue create --label "type:bug" --repo {REPOSITORY}

# General task
gh issue create --label "type:task" --repo {REPOSITORY}
```

### Labels

| Category | Labels |
| -------- | ------ |
| Type | `type:feature`, `type:bug`, `type:task` |
| Priority | `priority:high`, `priority:medium`, `priority:low` |
| Status | `status:in-progress`, `status:blocked`, `status:review` |

### Branch Naming

```bash
git checkout -b feature/{issue-number}-{short-description}
git checkout -b fix/{issue-number}-{short-description}
```

### Workflow

1. Create Issue (auto-added to Project)
2. Assign milestone and labels
3. Create branch from issue
4. Follow 6-Phase development workflow
5. Submit PR (references issue with `closes #N`)
6. Review and merge

### PR Template

```markdown
## Summary
{Brief description}

## Related Issue
closes #{issue_number}

## Phases Completed
- [x] Phase 1: Requirements
- [x] Phase 2: Design
- [x] Phase 3: Edge Cases
- [x] Phase 4: Implementation
- [x] Phase 5: Debug
- [x] Phase 6: Release
```

### GitHub Project Sync

```bash
# Read project config
cat .cursor/project.json

# List tasks
gh project item-list {PROJECT_NUMBER} --owner {PROJECT_OWNER}

# Close issue on completion
gh issue close <number> --repo {REPOSITORY}
```

## Detailed References

- Issue workflow: `references/issue-workflow.md`
- PR workflow: `references/pr-workflow.md`
