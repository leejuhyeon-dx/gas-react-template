# Diagram Types Guide

Comprehensive guide for each supported diagram type in FigJam via Figma MCP.

## Supported Types

| Type | Mermaid Declaration | Best Use Case |
| ---- | ------------------- | ------------- |
| Flowchart | `flowchart LR` or `graph LR` | Process flows, decisions |
| Sequence Diagram | `sequenceDiagram` | System interactions |
| State Diagram | `stateDiagram-v2` | State machines |
| Gantt Chart | `gantt` | Project timelines |

## Flowchart / Graph

### When to Use

- Process workflows
- Decision trees
- Algorithm visualization
- System architecture overview
- User journey mapping

### Node Shapes

| Shape | Syntax | Use For |
| ----- | ------ | ------- |
| Rectangle | `A["Text"]` | Process steps |
| Rounded | `A("Text")` | Start/End points |
| Diamond | `A{"Text"}` | Decisions |
| Circle | `A(("Text"))` | Connectors |
| Stadium | `A(["Text"])` | Events |

### Direction Options

- `LR` - Left to Right (recommended default)
- `RL` - Right to Left
- `TB` - Top to Bottom
- `BT` - Bottom to Top

## Sequence Diagram

### When to Use

- API call flows
- Service-to-service communication
- User interaction flows
- Authentication sequences
- Message passing between components

### Key Features

- `participant`: Define actors/systems
- `activate/deactivate`: Show active periods
- `loop`: Repeating sequences
- `alt/else`: Conditional flows
- `opt`: Optional flows

**Note**: Do NOT use `note` syntax -- not supported by Figma MCP.

## State Diagram

### When to Use

- State machines
- Object lifecycle
- Status transitions
- Workflow states
- Mode changes

### Special States

| Symbol | Meaning |
| ------ | ------- |
| `[*]` | Start or End state |
| `state` | Regular state |

## Gantt Chart

### When to Use

- Project planning
- Sprint timelines
- Release schedules
- Task dependencies
- Milestone tracking

### Task Status

| Status | Syntax |
| ------ | ------ |
| Active | `active` |
| Done | `done` |
| Critical | `crit` |
| Milestone | `milestone` |

**Note**: Do NOT use color styling in Gantt charts.

## Unsupported Diagram Types

NOT supported by Figma MCP:
- Class diagrams, Timeline diagrams, Venn diagrams
- Entity Relationship (ER) diagrams, Pie charts, Mind maps, Quadrant charts

If user requests these, suggest:
1. Use a supported alternative
2. Create manually in FigJam
3. Use a different visualization tool
