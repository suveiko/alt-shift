# Variant group test task

Application Generator - a modern web application for generating job applications using AI.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Run Storybook
pnpm storybook
```

## 📦 Available Commands

```bash
pnpm dev              # Run dev server (localhost:5173)
pnpm build            # Build production version
pnpm preview          # Preview production build
pnpm typecheck        # Check TypeScript types
pnpm lint             # Check code with ESLint
pnpm lint:fix         # Auto-fix lint errors
pnpm format           # Format code with Prettier
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm storybook        # Run Storybook (localhost:6006)
pnpm build-storybook  # Build Storybook
```

## 🏗️ Tech Stack

- **React 18** - UI library
- **TypeScript** - type safety
- **Vite** - build tool and dev server
- **React Router v7** - routing
- **React Hook Form + Zod** - forms and validation
- **Vitest** - unit testing
- **Playwright** - E2E testing
- **Storybook** - component documentation
- **CSS Modules** - styling

## 📁 Project Structure

The project uses **Feature-Sliced Design** architecture:

```
src/
├── app/              # Application initialization
│   └── providers/    # Providers (routing, storage)
├── pages/            # Application pages
├── widgets/          # Complex UI blocks
├── features/         # Feature implementations
├── entities/         # Business entities
└── shared/           # Reusable code
    ├── ui/           # UI components
    ├── api/          # API clients
    └── styles/       # Global styles and CSS variables
```

## 🎨 Storybook

UI component documentation is available in Storybook:

- **Local**: `pnpm storybook` → http://localhost:6006
- **Production**: Automatically deployed to Netlify

## 🧪 Testing

### Unit Tests

```bash
pnpm test:unit        # watch mode
pnpm test:unit --run  # single run
```

### E2E Tests

```bash
pnpm test:e2e
```

## 📝 Requirements

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## 📄 License

MIT
