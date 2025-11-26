# Aerovite

A React + TypeScript project built with **Clean Architecture** principles, featuring a modern auto-parts e-commerce dashboard.

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **UI Library**: shadcn/ui (Tailwind CSS v4)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Architecture**: Clean Architecture

## Architecture Overview

This project follows the Clean Architecture separation of concerns, dividing the application into four distinct layers:

### 1. Core (Domain & Use Cases)
- **Domain**: Contains pure TypeScript entities and interfaces (e.g., `User`, `AutoPart`, `DashboardStats`, `InventoryRepository`). This layer is independent of any framework or external library.
- **Use Cases**: Contains application business logic (e.g., `GetUser`, `GetInventory`, `GetDashboardStats`). It orchestrates data flow between the Domain and the outside world.

### 2. Infrastructure
- Contains implementations of the interfaces defined in the Core layer (e.g., `UserApiRepository`, `MockInventoryRepository`).
- Handles external concerns like API calls (using Axios), mock data, etc.

### 3. Presentation
- **Hooks**: Adapters that connect the UI to the Use Cases (e.g., `useUser`, `useInventory`, `useDashboardStats`). They handle state management and side effects.
- **Components**: React components that display data and capture user interactions. Built with shadcn/ui components.
- **Pages**: Top-level page components (e.g., `Dashboard`, `UserProfile`).
- **Store**: Zustand stores for global UI state (e.g., `useAppStore` for sidebar, theme, selected menu).

### 4. DI (Dependency Injection)
- A Composition Root that wires up the dependencies (e.g., injecting `MockInventoryRepository` into `GetInventory`).

### Dependency Rule

Dependencies only point **inwards**:
- Presentation → Core
- Infrastructure → Core
- Core depends on NOTHING (or only other Core elements).

### Data Flow Example (Dashboard Stats)

1. **UI**: `Dashboard` component calls `useDashboardStats()`.
2. **Presentation**: `useDashboardStats` hook calls `di.getDashboardStats.execute()`.
3. **Core (Use Case)**: `GetDashboardStats` calls `inventoryRepository.getDashboardStats()`.
4. **Infrastructure**: `MockInventoryRepository` returns mock data (simulating an API call).
5. **Result**: Data flows back up: Repo → UseCase → Hook → UI.

## shadcn/ui Integration

This project uses **shadcn/ui** with **Tailwind CSS v4**. Components are installed on-demand and stored in `src/components/ui/`.

### Installed Components
- `card`, `table`, `button`, `badge`, `separator`, `sheet`, `input`

### Configuration
- **Tailwind Config**: `tailwind.config.js` (uses Tailwind v4 syntax)
- **PostCSS**: `postcss.config.js` (uses `@tailwindcss/postcss`)
- **CSS**: `src/index.css` (uses `@import "tailwindcss"`)
- **Path Alias**: `@/*` maps to `./src/*` (configured in `tsconfig.json` and `vite.config.ts`)

## Zustand State Management

Zustand is used for global UI state management. It fits into Clean Architecture as part of the **Presentation layer**.

### Store: `useAppStore`
Located at `src/presentation/store/useAppStore.ts`, it manages:
- `sidebarOpen`: Sidebar visibility
- `selectedMenu`: Currently selected menu item
- `theme`: Light/Dark theme (future feature)

Zustand is **not** used for domain logic or business state—only for UI concerns like sidebar state and theme.

## Dashboard Feature

The dashboard demonstrates Clean Architecture with a real-world example:

### Domain
- `AutoPart`: Entity representing an auto part (id, name, sku, stock, price, category)
- `DashboardStats`: Entity representing dashboard statistics (sales, orders, revenue, products)
- `InventoryRepository`: Interface for fetching inventory and stats

### Use Cases
- `GetInventory`: Fetches list of auto parts
- `GetDashboardStats`: Fetches dashboard statistics

### Infrastructure
- `MockInventoryRepository`: Mock implementation with sample data

### Presentation
- `Dashboard`: Main dashboard page
- `Sidebar`: Navigation sidebar with menu items
- `StatsCards`: Overview cards (sales, orders, revenue, products)
- `InventoryTable`: Table listing auto parts with stock status badges

## Path Aliases

All imports use the `@/` alias to avoid relative imports (`../../`):

```typescript
import { AutoPart } from "@/core/domain/AutoPart";
import { useAppStore } from "@/presentation/store/useAppStore";
```

## Installation

```bash
npm install
```

## Development

Make sure to use Node 18+ or Node 20:

```bash
nvm use 20
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── core/
│   ├── domain/          # Entities & Repository Interfaces
│   └── usecases/        # Business Logic
├── infrastructure/
│   └── repositories/    # Repository Implementations
├── presentation/
│   ├── components/      # UI Components (shadcn/ui)
│   ├── hooks/           # React Hooks (View Models)
│   ├── pages/           # Page Components
│   └── store/           # Zustand Stores
├── di/                  # Dependency Injection
└── lib/                 # Utilities (shadcn/ui utils)
```
