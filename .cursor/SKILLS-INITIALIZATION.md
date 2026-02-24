# Skills and Rules Initialization

This document describes the Skills and Rules setup for this project.

## Overview

This project separates guidelines into two categories:

- **Skills** (`.cursor/skills/`): Workflow and process guides
- **Rules** (`.cursor/rules/`): Domain expertise and always-on directives

## Rules

| File | Description | Apply |
| ---- | ----------- | ----- |
| `project-conventions.mdc` | Code/file conventions, English-only output | Always |
| `workflow-enforcement.mdc` | 6-phase development workflow enforcement | Always |
| `diagram-specialist.mdc` | Diagram creation (7-step, Figma MCP, decision node colors) | On diagram requests |

**Note**: Legacy `.cursorrules` is deprecated. Use `.cursor/rules/*.mdc` instead.

## Skills

### 1. development-workflow

**Path**: `.cursor/skills/development-workflow/SKILL.md`

**Trigger**: "let's start working", "new feature", "start task", "start development"

**Content**:
- 6-phase development workflow
- Requirements -> Design -> Edge Cases -> Implementation -> Debug -> Release
- Phase gates with user confirmation

**Related Rules**:
- `workflow-enforcement.mdc`: Ensures phases are not skipped

**References**:
- `references/phase1-requirements.md`: Requirements definition
- `references/phase2-design.md`: Design with diagrams
- `references/phase3-edge-cases.md`: Edge case analysis
- `references/phase4-implementation.md`: TDD implementation
- `references/phase5-debug.md`: Debug and verification
- `references/phase6-release.md`: Release process

### 2. figjam-diagram

**Path**: `.cursor/skills/figjam-diagram/SKILL.md`

**Trigger**: "create diagram", "draw flowchart", "sequence diagram", "visualize architecture"

**Content**:
- 7-step consultation process (Step 7: Feedback request)
- Mermaid.js syntax for Figma MCP
- Decision node color coding (positive=green, negative=red, default=no class)
- Figma MCP integration
- File naming conventions

**Related Rules**:
- `diagram-specialist.mdc`: Technical diagram creation guide

**References**:
- `references/consultation-process.md`: 7-step process
- `references/diagram-types.md`: Diagram type guide
- `references/mermaid-syntax.md`: Mermaid syntax rules
- `references/figma-mcp-usage.md`: Figma MCP usage
- `references/file-conventions.md`: File naming rules

### 3. project-management

**Path**: `.cursor/skills/project-management/SKILL.md`

**Trigger**: Creating/updating issues, PR management, milestone management

**Content**:
- GitHub Project workflow
- Issue creation and management
- PR workflow with 6-phase checklist
- Labels usage

**References**:
- `references/issue-workflow.md`: Issue workflow
- `references/pr-workflow.md`: PR workflow

### 4. skill-creator

**Path**: `.cursor/skills/skill-creator/SKILL.md`

**Trigger**: Creating new skills, updating existing skills

**Content**:
- Skill creation guide
- SKILL.md format
- Structure rules

## Usage

### Using Skills

1. **Starting a task**: Read `development-workflow` skill, follow 6 phases
2. **Creating diagrams** (Phase 2): Read `figjam-diagram` skill
3. **Issue/PR management**: Read `project-management` skill
4. **Creating new skills**: Read `skill-creator` skill

### Skills and Rules Coordination

- **Skills**: Provide workflows and processes
- **Rules**: Provide technical details and enforcement
- **Coordination**: Skills reference related Rules for implementation details
