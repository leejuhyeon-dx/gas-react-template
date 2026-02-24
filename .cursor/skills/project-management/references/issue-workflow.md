# Issue Workflow

## Creating Issues

```bash
# Feature
gh issue create --title "feat: description" --label "type:feature" --repo {REPOSITORY}

# Bug
gh issue create --title "fix: description" --label "type:bug" --repo {REPOSITORY}

# Task
gh issue create --title "task: description" --label "type:task" --repo {REPOSITORY}
```

## Issue Lifecycle

```
Created -> Triaged -> In Progress -> Review -> Done
```

1. **Created**: Issue opened with proper labels
2. **Triaged**: Assigned to milestone, priority set
3. **In Progress**: Branch created, work started (6-Phase workflow)
4. **Review**: PR submitted, code review
5. **Done**: PR merged, issue closed

## Branch Naming

```bash
# Format: {type}/{issue-number}-{short-description}
git checkout -b feature/123-user-auth
git checkout -b fix/456-login-error
git checkout -b refactor/789-cleanup-api
```

## Labels

### Setting Up Labels

```bash
# Type labels
gh label create "type:feature" --color "0075ca" --repo {REPOSITORY}
gh label create "type:bug" --color "d73a4a" --repo {REPOSITORY}
gh label create "type:task" --color "0e8a16" --repo {REPOSITORY}

# Priority labels
gh label create "priority:high" --color "b60205" --repo {REPOSITORY}
gh label create "priority:medium" --color "fbca04" --repo {REPOSITORY}
gh label create "priority:low" --color "c5def5" --repo {REPOSITORY}

# Status labels
gh label create "status:in-progress" --color "1d76db" --repo {REPOSITORY}
gh label create "status:blocked" --color "e4e669" --repo {REPOSITORY}
gh label create "status:review" --color "5319e7" --repo {REPOSITORY}
```

## Auto-Close Syntax

In PR descriptions, use:
- `closes #123`
- `fixes #123`
- `resolves #123`
