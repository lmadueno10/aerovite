# Aerovite

A modern React + TypeScript auto-parts e-commerce dashboard built with **Feature-Based Architecture**.

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **UI Library**: shadcn/ui (Tailwind CSS v4)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Architecture**: Feature-Based (2024 standards)

## Project Structure

```
src/
├── features/              # Feature modules (self-contained)
│   ├── dashboard/         # Dashboard feature
│   │   ├── components/    # Dashboard-specific components
│   │   ├── pages/         # Dashboard pages
│   │   ├── hooks/         # Data fetching & logic
│   │   ├── services/      # API calls
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Public API
│   └── user/              # User feature
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── shared/                # Shared resources
│   ├── components/
│   │   └── ui/            # shadcn/ui design system
│   ├── lib/               # Utilities
│   └── store/             # Global state (Zustand)
├── App.tsx
└── main.tsx
```

## Architecture Principles

### Feature-Based Organization
Each feature is **self-contained** and owns everything it needs:
- ✅ **Components**: UI specific to the feature
- ✅ **Pages**: Route components
- ✅ **Hooks**: Data fetching and business logic
- ✅ **Services**: API calls and external operations
- ✅ **Types**: TypeScript interfaces and types
- ✅ **Public API**: Barrel export (`index.ts`)

### Shared Resources
Code used across **2+ features** lives in `shared/`:
- **UI Components**: shadcn/ui design system
- **Utilities**: Formatters, validators, helpers
- **Global State**: App-wide Zustand stores (sidebar, theme, auth)

### Import Conventions
```typescript
// Feature imports (from outside the feature)
import { DashboardPage } from '@features/dashboard';

// Shared imports
import { Button } from '@shared/components/ui/button';
import { useAppStore } from '@shared/store/appStore';

// Internal feature imports (within the feature)
import { useInventory } from '../hooks/useInventory';
import type { AutoPart } from '../types/inventory';
```

## Features

### Dashboard
Auto-parts inventory management dashboard with:
- **Stats Cards**: Sales, orders, revenue, products overview
- **Inventory Table**: Product listing with stock status badges
- **Sidebar Navigation**: Feature navigation menu

**Tech**: Mock data service, Zustand for UI state, shadcn/ui components

### User (Demo)
User profile display feature demonstrating:
- External API integration (JSONPlaceholder)
- Dynamic data fetching
- Feature isolation

## Installation

```bash
npm install
```

## Development

**Important**: Use Node 18+ or Node 20

```bash
nvm use 20
npm run dev
```

Visit `http://localhost:5173`

## Build

```bash
npm run build
```

## Path Aliases

The project uses three path aliases:

| Alias | Maps To | Usage |
|-------|---------|-------|
| `@/*` | `./src/*` | Legacy/general imports |
| `@features/*` | `./src/features/*` | Feature imports |
| `@shared/*` | `./src/shared/*` | Shared resource imports |

## Adding a New Feature

1. **Create feature folder**:
   ```bash
   mkdir -p src/features/my-feature/{components,pages,hooks,services,types}
   ```

2. **Add feature files**:
   - `types/` - TypeScript interfaces
   - `services/` - API calls
   - `hooks/` - Data fetching hooks
   - `components/` - UI components
   - `pages/` - Route pages

3. **Create barrel export** (`index.ts`):
   ```typescript
   export { MyFeaturePage } from './pages/MyFeaturePage';
   export type { MyType } from './types';
   ```

4. **Use in App**:
   ```typescript
   import { MyFeaturePage } from '@features/my-feature';
   ```

## Why Feature-Based Architecture?

### vs Clean Architecture

| Aspect | Feature-Based | Clean Architecture |
|--------|--------------|-------------------|
| **Learning Curve** | 15 minutes | 2+ hours |
| **New Feature Time** | 30 minutes | 2 hours |
| **Files to Touch** | 1 folder | 4+ folders |
| **Colocation** | ✅ Everything together | ❌ Scattered across layers |
| **Refactoring** | Delete 1 folder | Delete from 4+ folders |

### Benefits
- 🚀 **Faster Development**: Everything for a feature in one place
- 🎯 **Easier Navigation**: No jumping between domain/usecases/infrastructure
- 📦 **Better Colocation**: Related code lives together
- 🔧 **Pragmatic**: Add complexity only when needed
- 🌱 **Scalable**: Easy to add/remove features

## State Management

### Feature State (Zustand)
Each feature can have its own Zustand store for feature-specific state:
```typescript
// features/dashboard/store/dashboardStore.ts
export const useDashboardStore = create((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
}));
```

### Global State
App-wide state lives in `shared/store/`:
```typescript
// shared/store/appStore.ts
export const useAppStore = create((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
```

## Contributing

When adding code, follow these rules:

1. **Feature-specific code** → `features/{feature-name}/`
2. **Shared code (used in 2+ features)** → `shared/`
3. **Use barrel exports** → Only export public API
4. **Use path aliases** → `@features/*`, `@shared/*`
5. **Keep features independent** → Avoid cross-feature imports

## License

MIT
