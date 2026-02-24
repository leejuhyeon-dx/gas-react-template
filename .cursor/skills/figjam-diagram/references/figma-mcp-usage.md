# Figma MCP Usage Guide

Guide for using Figma MCP's `generate_diagram` tool to create FigJam diagrams.

## Tool Overview

The `generate_diagram` tool creates diagrams in FigJam using Mermaid.js syntax.

### Supported Diagram Types

| Type | Declaration |
| ---- | ----------- |
| Flowchart | `flowchart` or `graph` |
| Sequence Diagram | `sequenceDiagram` |
| State Diagram | `stateDiagram` or `stateDiagram-v2` |
| Gantt Chart | `gantt` |

### Not Supported

- Class diagrams, Timeline diagrams, Venn diagrams, ER diagrams
- Font changes, Moving individual shapes (must do in FigJam directly)

## Tool Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `name` | string | Yes | Human-readable title for the diagram |
| `mermaidSyntax` | string | Yes | Valid Mermaid.js code |
| `userIntent` | string | No | Description of user's goal |

## Calling the Tool

### Basic Call Structure

```javascript
CallMcpTool({
  server: "user-Figma",
  toolName: "generate_diagram",
  arguments: {
    name: "Authentication Flow",
    mermaidSyntax: `sequenceDiagram
    participant User
    participant Auth
    participant DB
    User->>Auth: Login request
    Auth->>DB: Validate
    DB-->>Auth: Result
    Auth-->>User: Response`,
    userIntent: "Visualize the login authentication process"
  }
})
```

### Example: Flowchart

```javascript
CallMcpTool({
  server: "user-Figma",
  toolName: "generate_diagram",
  arguments: {
    name: "Order Processing Workflow",
    mermaidSyntax: `flowchart LR
    A["Order Received"] --> B{"Valid?"}
    B -->|"Yes"| C["Process Payment"]
    B -->|"No"| D["Reject Order"]
    C --> E["Ship Order"]
    E --> F["Complete"]
    D --> F`,
    userIntent: "Show the order processing workflow"
  }
})
```

## Post-Call Requirements

After calling the tool, you **MUST** display the returned URL as a markdown link:

```markdown
I've created your diagram!

[View your diagram in FigJam](https://www.figma.com/board/...)
```

## Error Handling

| Error Type | Likely Cause | Solution |
| ---------- | ------------ | -------- |
| Syntax error | Invalid Mermaid syntax | Check quotes, node IDs, declarations |
| Unsupported type | Wrong diagram type | Use only supported types |
| Render failure | Special characters | Remove emoji, ensure proper escaping |

### Retry Strategy

1. Simplify the diagram syntax
2. Remove any styling
3. Check for syntax errors
4. Try with minimal example first

## Best Practices

1. **Keep diagrams simple** unless the user specifically asks for detail
2. **Use descriptive names** ("User Registration Flow" not "Diagram 1")
3. **Always include userIntent** for debugging and future reference
4. **Validate before calling** (quotes, no spaces in IDs, no emoji)
