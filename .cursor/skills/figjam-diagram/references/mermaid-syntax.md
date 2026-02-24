# Mermaid Syntax Guide

Mermaid.js syntax rules specifically for Figma MCP's `generate_diagram` tool.

## Critical Rules for Figma MCP

These rules are REQUIRED for the diagram to render correctly:

### 1. Text Must Be in Quotes

```mermaid
# CORRECT
A["Process Step"]
B["Decision Point"]
A -->|"Yes"| B

# WRONG
A[Process Step]
B[Decision Point]
A -->|Yes| B
```

### 2. No Spaces in Node IDs

```mermaid
# CORRECT
UserService["User Service"]
processData["Process Data"]

# WRONG
User Service["User Service"]
process data["Process Data"]
```

### 3. No Emoji Characters

```mermaid
# CORRECT
A["Start Process"]
B["Success"]

# WRONG
A["Start Process"]
B["Success"]
```

### 4. No Newline Characters in Syntax

Use actual newlines in code, not escaped `\n`.

### 5. Default Direction is LR

For flowcharts and graphs, use `LR` (Left to Right) by default:

```mermaid
flowchart LR
    A["Start"] --> B["Process"] --> C["End"]
```

### 6. No "end" in Class Names

```mermaid
# CORRECT
classDef processEnd fill:#f00

# WRONG
classDef end fill:#f00
```

## Flowchart Syntax

### Basic Elements

```mermaid
flowchart LR
    A["Rectangle"]
    B("Rounded")
    C{"Diamond"}
    D(("Circle"))
    E(["Stadium"])
    F[["Subroutine"]]
    G[("Database")]
```

### Connection Types

| Syntax | Description |
| ------ | ----------- |
| `-->` | Arrow |
| `---` | Line |
| `-.->` | Dotted arrow |
| `==>` | Thick arrow |
| `-->|"text"|` | Arrow with text |

### Subgraphs

```mermaid
flowchart LR
    subgraph Backend["Backend Services"]
        API["API Gateway"]
        DB["Database"]
    end

    subgraph Frontend["Frontend"]
        UI["User Interface"]
    end

    UI --> API
    API --> DB
```

### Decision Node Styling (RECOMMENDED for flowcharts with if-branches)

| Outcome | Color (fill) | classDef name |
| ------- | ------------ | -------------- |
| **Positive** | Green (`#d4edda`) | `positiveClass` |
| **Negative** | Red (`#f8d7da`) | `negativeClass` |
| **Default** | No class | -- |

**Example**:

```mermaid
flowchart LR
    A["Start"] --> B{"Valid?"}
    B -->|"Yes"| C["Process"]:::positiveClass
    B -->|"No"| D["Error Handler"]:::negativeClass
    C --> E["End"]
    D --> E

    classDef positiveClass fill:#d4edda,stroke:#28a745
    classDef negativeClass fill:#f8d7da,stroke:#dc3545
```

## Sequence Diagram Syntax

### Basic Elements

```mermaid
sequenceDiagram
    participant A as Client
    participant B as Server
    participant C as Database

    A->>B: Request
    B->>C: Query
    C-->>B: Result
    B-->>A: Response
```

### Message Types

| Syntax | Description |
| ------ | ----------- |
| `->>` | Solid line, solid arrow |
| `-->>` | Dotted line, solid arrow |
| `-x` | Solid line, cross end |
| `--x` | Dotted line, cross end |

### Control Flow

```mermaid
sequenceDiagram
    participant User
    participant System

    User->>System: Login request

    alt Valid credentials
        System-->>User: Success
    else Invalid credentials
        System-->>User: Error
    end

    loop Every 5 minutes
        System->>System: Heartbeat
    end
```

**Important**: Do NOT use `note` syntax -- not supported.

## State Diagram Syntax

### Basic Structure

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Active: Activate
    Active --> Idle: Deactivate
    Active --> [*]: Terminate
```

### Composite States

```mermaid
stateDiagram-v2
    state Ready {
        [*] --> Waiting
        Waiting --> Processing: Input
        Processing --> [*]: Done
    }
```

## Gantt Chart Syntax

### Basic Structure

```mermaid
gantt
    title Project Schedule
    dateFormat YYYY-MM-DD

    section Phase 1
    Task 1    :a1, 2024-01-01, 5d
    Task 2    :a2, after a1, 3d

    section Phase 2
    Task 3    :b1, after a2, 7d
    Milestone :milestone, m1, after b1, 0d
```

**Note**: Do NOT use color styling in Gantt charts.

## Common Errors and Solutions

| Error | Cause | Solution |
| ----- | ----- | -------- |
| Syntax error | Spaces in node ID | Use camelCase or underscores |
| Render failure | Emoji in text | Remove all emoji |
| Missing text | Unquoted labels | Wrap all text in quotes |
| Invalid diagram | Unsupported type | Use supported types only |
