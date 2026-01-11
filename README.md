# Variant group test task

ALT+SHIFT - a modern web application for generating job applications using AI.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://alt-shit.netlify.app/)
[![Storybook](https://img.shields.io/badge/Storybook-Live-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://alt-shift-storybook.netlify.app/)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Create .env file from example
cp .env.example .env

# Add your OpenAI API key to .env
# VITE_OPENAI_API_KEY=your-api-key-here

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
- **Production**: [https://alt-shift-storybook.netlify.app/](https://alt-shift-storybook.netlify.app/) 🎨✨

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

## ⚙️ Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Required variables:

- `VITE_OPENAI_API_URL` - OpenAI API base URL (default: `https://api.openai.com`)
- `VITE_OPENAI_API_KEY` - Your OpenAI API key (required for production)
- `VITE_OPENAI_MODEL` - OpenAI model to use (default: `gpt-4-turbo-preview`)

**Note**: The app will work without env variables (using mocked API responses), but you need a real API key for production use.

## 📝 Requirements

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## 📄 License

MIT
