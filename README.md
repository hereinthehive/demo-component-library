# Demo Component Library

A demonstration component library for testing [Gotrino](https://github.com/hereinthehive/gotrino) source linking capabilities.

## Components

- **Button** - Primary interactive element with variants (primary, secondary, danger, ghost) and sizes
- **Card** - Container component for grouping related content
- **InputField** - Form input with label, validation, and error states
- **TestBlock** - Simple colored block for visual testing

## Usage

```tsx
import { Button, Card, InputField, TestBlock } from '@demo/component-library';

function App() {
  return (
    <Card>
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        required
      />
      <Button variant="primary" size="medium">
        Submit
      </Button>
    </Card>
  );
}
```

## Purpose

This library exists to demonstrate Gotrino's GitHub source plugin functionality, allowing design system teams to:

- Link code components from GitHub repos to canonical component definitions
- Track component health across design and code sources
- Visualize design-code alignment

## License

MIT
