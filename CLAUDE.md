# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **dual-project monorepo** for an AI course teaching how to collaborate with AI agents during development.

1. **Root project** (`/`): Practice exercises for Agent Skills (linting, testing, commit practices)
2. **Vehicle Management App** (`/vehicle-mgmt-app`): A React + TypeScript application for vehicle fleet management

## Build & Test Commands

### Root Project (Agent Skills Practice)

```bash
npm install                 # Install dependencies
npm run lint               # Run ESLint on all files
npm run lint:fix           # Fix linting issues automatically
npm test                   # Run Jest tests
npm run test:watch         # Run tests in watch mode
npm test -- --testNamePattern="suite name"  # Run specific test suite
npm run prepare             # Setup Husky pre-commit hooks
```

**Git Workflow:**
- Pre-commit hook runs `npm run lint` and `npm test` in parallel
- Both must pass before commit succeeds
- Hook output is divided into lint and test sections for clarity

### Vehicle Management App

```bash
cd vehicle-mgmt-app
npm install                # Install dependencies
npm run dev                # Start Vite dev server (http://localhost:5173)
npm run build              # Build TypeScript and optimize for production
npm run lint               # Run ESLint for React/TypeScript
npm run preview            # Preview production build locally
```

## Project Structure

### Root Project (`/src`)

```
src/
├── skills/
│   ├── echo.js            # Example skill demonstrating ESLint rules
│   └── __tests__/
│       └── echo.test.js   # Jest tests for echo skill
```

The root project contains:
- **skills practice**: `echo.js` has intentional ESLint violations for learning purposes (var, console.log, loose equality, unused vars)
- **config files**: eslint.config.js (flat ESLint config), package.json (Node.js >=20 required)
- **.agents/skills/**: Pre-built Agent Skills for Claude Code (git-smart-commit, gen-test-cases, git-pr-description, git-branch-name, etc.)

### Vehicle Management App (`/vehicle-mgmt-app`)

```
vehicle-mgmt-app/
├── src/
│   ├── components/        # Reusable React UI components (Radix UI based)
│   ├── pages/             # Page components (routed views)
│   ├── api/               # API utilities and mock handlers (MSW)
│   ├── hooks/             # Custom React hooks (React Query integration)
│   ├── context/           # React context providers (global state)
│   ├── mocks/             # MSW mock service worker setup
│   ├── lib/               # Utilities (form handling with Zod, etc.)
│   ├── assets/            # Static resources
│   ├── App.tsx            # Root component
│   ├── routes.tsx         # React Router configuration
│   └── main.tsx           # Entry point
├── public/                # Static files and MSW worker
├── vite.config.ts         # Vite bundler config (with @tailwindcss/vite)
├── tsconfig.json          # TypeScript configuration (base + app + node configs)
└── eslint.config.js       # ESLint with React hooks and TypeScript support
```

**Tech Stack:**
- **Frontend**: React 19, React Router v7, TypeScript 6
- **Styling**: Tailwind CSS 4 (via @tailwindcss/vite plugin)
- **UI Components**: Radix UI primitives (Dialog, Select, Dropdown, Label, Slot)
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack React Query, Mock Service Worker (MSW)
- **Bundler**: Vite 8
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts

## Architecture & Key Patterns

### OpenSpec Workflow Integration

The repository uses **OpenSpec** (`/openspec/`) for spec-driven development:

```
openspec/
├── config.yaml            # Schema configuration (spec-driven)
├── specs/                 # Main specifications (vehicle-management, user-auth, etc.)
│   ├── vehicle-management/spec.md
│   ├── user-auth/
│   ├── employee-management/
│   └── dashboard/
└── changes/               # Implementation tracking (delta specs, tasks)
    └── archive/           # Completed changes
```

**Workflow**: When implementing a feature, AI will create OpenSpec artifacts (design, tasks, implementation specs) that guide development. Specs define requirements in BDD-like scenarios (WHEN/THEN format).

### Vehicle Management Feature

The Vehicle Management app implements the `vehicle-management` specification, which defines:
- **CRUD operations**: List, Add, Edit, Delete vehicles
- **Data model**: `id`, `licensePlate`, `brand`, `model`, `year`, `status` (enum: available | in-use | maintenance)
- **Mock API endpoints**: `GET /api/vehicles`, `POST /api/vehicles`, `PUT /api/vehicles/:id`, `DELETE /api/vehicles/:id`
- **UI interactions**: Paginated table, search filtering, dialog forms with validation

### Agent Skills in `.agents/skills/`

Built-in skills extend Claude Code capabilities:

| Skill | Purpose |
|-------|---------|
| `git-smart-commit` | Auto-split staged changes into logical conventional commits |
| `git-branch-name` | Generate kebab-case branch names from change description |
| `git-pr-description` | Auto-generate PR title and description from branch diff |
| `gen-test-cases` | Generate test case lists and implementation from code selection |
| `openspec-new-change` | Start a new OpenSpec change with artifact workflow |
| `openspec-apply-change` | Implement tasks from an OpenSpec change |
| `openspec-verify-change` | Verify implementation matches change artifacts |
| `openspec-archive-change` | Archive completed changes |

Access skills in Claude Code by typing `/` in the chat.

## Configuration

### ESLint Rules (Root Project)

Enforced rules in `eslint.config.js`:
- `no-var`: Use `let`/`const` instead
- `prefer-const`: Use `const` for non-reassigned variables
- `no-unused-vars`: Remove unused declarations
- `eqeqeq: ["error", "always"]`: Use `===` not `==`
- `no-console`: Warn on console usage in production code
- Test files allow Jest globals: `describe`, `it`, `expect`, `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

### Vite Aliases (Vehicle App)

`@` resolves to `src/` (e.g., `import Button from '@/components/Button'`)

### TypeScript Configuration (Vehicle App)

- `tsconfig.app.json`: React app settings (JSX, ES2020 target)
- `tsconfig.node.json`: Node/Vite tools settings
- Separated for build-time vs runtime type checking

## Development Workflow

1. **New feature**: Use `/opsx:new` or `/openspec-new-change` to create a spec
2. **Implementation**: Use `/opsx:apply` to get tasks and implement them
3. **Testing**: Run `npm test` or `npm test:watch` (root), or `npm run dev` (vehicle-app)
4. **Commits**: Use `/git-smart-commit` to auto-split changes into semantic commits
5. **PR**: Use `/git-pr-description` to generate PR title and body
6. **Verification**: Use `/opsx:verify` before archiving a change

## Testing Setup

### Jest Configuration (Root Project)

- Runs with `--experimental-vm-modules` flag for ES modules support
- Test files: `src/**/__tests__/**/*.js` or `*.test.js`
- Globals configured in eslint.config.js

### Mock API (Vehicle App)

- MSW (Mock Service Worker) handles all API calls during development
- `src/mocks/` contains handlers; `/public` contains MSW worker
- No backend needed for local development

## Important Notes

- **Node.js 20+** required for root project (ES modules)
- **React 19** in vehicle-mgmt-app (newer hooks API)
- **Husky pre-commit hooks** automatically run lint + test in parallel
- **Git convention**: Use conventional commits (feat, fix, chore, docs, style, refactor, test)
- **OpenSpec specs** are the source of truth for requirements; check them before implementing features
