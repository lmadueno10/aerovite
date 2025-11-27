# Architecture Documentation

## Overview

Aerovite uses a **modern feature-based architecture** that prioritizes developer experience, maintainability, and pragmatism over rigid layering patterns.

## Core Principles

### 1. Feature Colocation
**Everything a feature needs lives inside that feature.**

Each feature is a self-contained module with its own:
- Components (UI)
- Pages (routes)
- Hooks (data fetching & logic)
- Services (API calls)
- Types (TypeScript definitions)

### 2. Shared Resources
Code used across **2 or more features** is promoted to `shared/`.

### 3. Explicit Public APIs
Features export only what's needed externally via barrel exports (`index.ts`).

---

## Directory Structure

```
src/
├── features/
│   ├── dashboard/
│   │   ├── components/       # Dashboard-specific UI
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   └── InventoryTable.tsx
│   │   ├── pages/            # Route components
│   │   │   └── DashboardPage.tsx
│   │   ├── hooks/            # Data fetching & logic
│   │   │   ├── useInventory.ts
│   │   │   └── useDashboardStats.ts
│   │   ├── services/         # API calls
│   │   │   └── inventoryService.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── inventory.ts
│   │   └── index.ts          # Public API (barrel export)
│   │
│   └── user/
│       ├── components/
│       ├── pages/
│       │   └── UserProfilePage.tsx
│       ├── hooks/
│       │   └── useUser.ts
│       ├── services/
│       │   └── userService.ts
│       ├── types/
│       │   └── user.ts
│       └── index.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/               # shadcn/ui design system
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   └── table/            # Table utilities
│   │       └── TableSearch.tsx
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── hooks/
│   │   └── useDataTable.ts   # TanStack Table hook
│   └── store/
│       └── appStore.ts       # Global Zustand store
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## UI Patterns

### Tables

#### Global Multi-Column Search

**All tables in the project use a unified global search pattern that searches across all visible columns.**

##### Standard Behavior
- Search input filters rows across **every column** currently rendered in the table
- Uses TanStack Table's `globalFilter` state with `includesString` filter function
- Case-insensitive search across all string-based columns

##### Component Usage
```typescript
import { TableSearch } from "@shared/components/table/TableSearch";

// In your table component:
<TableSearch
  value={table.getState().globalFilter ?? ""}
  onChange={(value) => table.setGlobalFilter(value)}
  placeholder="Search..."
  className="max-w-sm"
/>
```

##### Visual Standards
- **Icon**: Magnifying glass (Search icon from lucide-react) positioned on the left
- **Placeholder**: Generic text like "Search..." or "Search in table..."
- **Styling**: Consistent with shadcn/ui Input component

##### Implementation Requirements
1. Use the shared `<TableSearch />` component from `@shared/components/table/TableSearch`
2. Connect to `table.getState().globalFilter` and `table.setGlobalFilter()`
3. Do NOT implement table-specific single-column filters
4. Do NOT use custom placeholder text that references specific columns

##### Hook Integration
The `useDataTable` hook automatically includes global filter support:
```typescript
const table = useDataTable({
  data: myData,
  columns: myColumns,
  pageSize: 10,
});

// Global filter is already configured with 'includesString' filter function
```

### Authentication

**Aerovite uses a fully mocked authentication system with session persistence.**

#### Architecture Overview

- **Session Management**: Zustand + localStorage
- **Route Protection**: Component-based guards (`<ProtectedRoute>`, `<PublicRoute>`)
- **Form Validation**: React Hook Form + Zod
- **Backend**: Fully mocked (accepts any credentials)

#### Folder Structure

```
features/auth/
├── components/
│   ├── AuthLayout.tsx          # Shared layout for auth pages
│   ├── ProtectedRoute.tsx      # Route guard for authenticated routes
│   └── PublicRoute.tsx         # Route guard for public auth pages
├── pages/
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── ForgotPasswordPage.tsx
│   └── ResetPasswordPage.tsx
├── services/
│   └── authService.ts          # Mocked auth API calls
├── store/
│   └── authStore.ts            # Zustand store + localStorage
├── hooks/
│   └── useAuth.ts              # Auth hook for components
├── types/
│   └── auth.ts                 # User, AuthState, Credentials types
└── index.ts                    # Public API
```

#### How It Works

**1. Mocked Authentication Service**

The auth service (`features/auth/services/authService.ts`) simulates API calls:
- Accepts any email/password combination
- Returns mock user + JWT token
- Simulates network delays (300-1200ms)
- Always succeeds (no error states)

```typescript
// Example: Login accepts any credentials
await authService.login({ email: "any@email.com", password: "anything" });
// Returns: { user: { id, email, name }, token: "mock-jwt-token-..." }
```

**2. Session Persistence**

Uses Zustand's `persist` middleware with localStorage:
- Session survives page reloads
- Token stored in localStorage (not sessionStorage)
- Auto-hydrates on app load

```typescript
// Auth store automatically persists:
// - user
// - token
// - isAuthenticated
```

**3. Route Protection**

Two guard components protect routes:

```typescript
// Protect authenticated routes
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>

// Redirect authenticated users away from auth pages
<PublicRoute>
  <LoginPage />
</PublicRoute>
```

**4. Using Auth in Components**

```typescript
import { useAuth } from "@features/auth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Login
  await login({ email, password, rememberMe });
  
  // Logout
  logout();
}
```

#### Migration to Real API

To replace mocked auth with real API:

**Step 1**: Update `authService.ts`
```typescript
// Before (mocked)
login: async (credentials) => {
  await delay(400);
  return { user: mockUser, token: mockToken };
}

// After (real API)
login: async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
}
```

**Step 2**: Add error handling
```typescript
try {
  await login(credentials);
} catch (error) {
  // Handle API errors
}
```

**No changes needed to**:
- Auth store
- Auth hooks
- Route guards
- UI components
- Form validation

---

## Feature Anatomy

### What Goes in Each Folder

#### `components/`
**Purpose**: Feature-specific UI components

**Examples**:
- `dashboard/components/Sidebar.tsx` - Dashboard navigation
- `dashboard/components/InventoryTable.tsx` - Product table

**Rule**: If a component is used in 2+ features, move it to `shared/components/common/`

#### `pages/`
**Purpose**: Top-level route components

**Examples**:
- `dashboard/pages/DashboardPage.tsx` - Main dashboard view
- `user/pages/UserProfilePage.tsx` - User profile view

**Rule**: One page = one route

#### `hooks/`
**Purpose**: Custom React hooks for data fetching and business logic

**Examples**:
- `dashboard/hooks/useInventory.ts` - Fetch inventory data
- `user/hooks/useUser.ts` - Fetch user data

**What goes here**:
- Data fetching hooks
- Business logic hooks
- Feature-specific state management

**What doesn't**:
- Generic utility hooks (those go in `shared/hooks/`)

#### `services/`
**Purpose**: API calls and external data operations

**Examples**:
```typescript
// dashboard/services/inventoryService.ts
export const inventoryService = {
  getInventory: () => fetch('/api/inventory'),
  updateStock: (id, quantity) => fetch(`/api/inventory/${id}`, { ... }),
};
```

**Rule**: Services are pure functions. No React hooks here.

#### `types/`
**Purpose**: TypeScript interfaces and types for this feature

**Examples**:
```typescript
// dashboard/types/inventory.ts
export interface AutoPart {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
  category: string;
}
```

**Rule**: If a type is used in 2+ features, move it to `shared/types/`

#### `index.ts` (Barrel Export)
**Purpose**: Define the feature's public API

**Example**:
```typescript
// features/dashboard/index.ts
export { DashboardPage } from './pages/DashboardPage';
export type { AutoPart, DashboardStats } from './types/inventory';

// DO NOT export:
// - Internal components
// - Services
// - Hooks (unless needed externally)
```

**Rule**: Only export what other features or the app need to consume.

---

## Import Patterns

### External Consumers (Outside the Feature)
```typescript
// App.tsx
import { DashboardPage } from '@features/dashboard';
import { Button } from '@shared/components/ui/button';
import { useAppStore } from '@shared/store/appStore';
```

### Internal to Feature
```typescript
// Within dashboard feature
import { useInventory } from '../hooks/useInventory';
import type { AutoPart } from '../types/inventory';
import { inventoryService } from '../services/inventoryService';
```

### Cross-Feature (Avoid When Possible)
```typescript
// ❌ Avoid
import { SomeComponent } from '@features/other-feature/components/SomeComponent';

// ✅ Better: Use shared
import { SomeComponent } from '@shared/components/common/SomeComponent';

// ✅ Best: Use public API
import { SomeExportedThing } from '@features/other-feature';
```

---

## Data Flow

### Example: Dashboard Stats

1. **Page** renders and calls hook
   ```typescript
   // DashboardPage.tsx
   const { stats, loading } = useDashboardStats();
   ```

2. **Hook** fetches data via service
   ```typescript
   // hooks/useDashboardStats.ts
   const stats = await inventoryService.getDashboardStats();
   ```

3. **Service** makes HTTP call
   ```typescript
   // services/inventoryService.ts
   getDashboardStats: () => fetch('/api/stats')
   ```

4. **Data flows back**: Service → Hook → Component

**No layers, just logical flow.**

---

## State Management

### Feature-Specific State (Optional)
```typescript
// features/dashboard/store/dashboardStore.ts
import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
  filters: {},
  sortBy: 'name',
  setFilters: (filters) => set({ filters }),
  setSortBy: (sortBy) => set({ sortBy }),
}));
```

**When to use**:
- State shared across multiple components in the feature
- Complex state that doesn't belong in URL params

### Global State
```typescript
// shared/store/appStore.ts
import { create } from 'zustand';

export const useAppStore = create((set) => ({
  sidebarOpen: true,
  theme: 'light',
  user: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  setUser: (user) => set({ user }),
}));
```

**What goes here**:
- UI state (sidebar, modals, theme)
- Auth state (current user, token)
- Global notifications

---

## Adding a New Feature

### Step-by-Step

1. **Create folder structure**:
   ```bash
   mkdir -p src/features/products/{components,pages,hooks,services,types}
   ```

2. **Define types**:
   ```typescript
   // features/products/types/product.ts
   export interface Product {
     id: number;
     name: string;
     price: number;
   }
   ```

3. **Create service**:
   ```typescript
   // features/products/services/productService.ts
   export const productService = {
     getAll: () => fetch('/api/products'),
     getById: (id) => fetch(`/api/products/${id}`),
   };
   ```

4. **Create hook**:
   ```typescript
   // features/products/hooks/useProducts.ts
   export function useProducts() {
     const [products, setProducts] = useState([]);
     useEffect(() => {
       productService.getAll().then(setProducts);
     }, []);
     return { products };
   }
   ```

5. **Create components**:
   ```typescript
   // features/products/components/ProductCard.tsx
   export const ProductCard = ({ product }) => { ... };
   ```

6. **Create page**:
   ```typescript
   // features/products/pages/ProductsPage.tsx
   import { useProducts } from '../hooks/useProducts';
   import { ProductCard } from '../components/ProductCard';

   export const ProductsPage = () => {
     const { products } = useProducts();
     return products.map(p => <ProductCard product={p} />);
   };
   ```

7. **Create barrel export**:
   ```typescript
   // features/products/index.ts
   export { ProductsPage } from './pages/ProductsPage';
   export type { Product } from './types/product';
   ```

8. **Use in app**:
   ```typescript
   // App.tsx or routes
   import { ProductsPage } from '@features/products';
   ```

---

## Decision Matrix: Where Does Code Go?

| Code Type | Location | Reasoning |
|-----------|----------|-----------|
| Feature-specific component | `features/{name}/components/` | Only used in this feature |
| Reusable component (2+ features) | `shared/components/common/` | Shared across features |
| Design system component | `shared/components/ui/` | Part of UI library (shadcn) |
| Table utility component | `shared/components/table/` | Table-specific shared components |
| Feature page | `features/{name}/pages/` | Route component |
| Data fetching hook | `features/{name}/hooks/` | Feature-specific logic |
| Generic utility hook | `shared/hooks/` | Used across features |
| API call | `features/{name}/services/` | Feature-specific endpoint |
| HTTP client setup | `shared/services/api/` | Shared infrastructure |
| Feature type | `features/{name}/types/` | Only used in this feature |
| Shared type | `shared/types/` | Used in 2+ features |
| Feature state | `features/{name}/store/` | Feature-specific state |
| Global state | `shared/store/` | App-wide state |
| Utility function | `shared/lib/` if used in 2+ features | Avoid premature sharing |

---

## Best Practices

### 1. Start Specific, Promote When Needed
- ✅ Start with code in the feature
- ✅ Move to `shared/` only when used in 2+ features
- ❌ Don't prematurely optimize for reuse

### 2. Keep Features Independent
- ✅ Features should not import from other features
- ✅ Use `shared/` for cross-feature code
- ❌ Avoid circular dependencies

### 3. Use Barrel Exports
- ✅ Export only public API via `index.ts`
- ✅ Hide implementation details
- ❌ Don't export everything

### 4. Follow Import Conventions
- ✅ Use `@features/*` for feature imports
- ✅ Use `@shared/*` for shared imports
- ✅ Use relative imports within features
- ❌ Don't use `@/` for new code

### 5. Collocate Related Code
- ✅ Keep components near their hooks
- ✅ Keep types near their usage
- ❌ Don't scatter related code

### 6. Use Global Table Search
- ✅ Use `<TableSearch />` for all table search inputs
- ✅ Search across all columns, not single columns
- ❌ Don't implement custom single-column filters

---

## Migration from Clean Architecture

This project was migrated from Clean Architecture to Feature-Based Architecture.

### What Changed

**Removed**:
- ❌ `core/domain/` - Entities moved to `features/*/types/`
- ❌ `core/usecases/` - Logic moved to `features/*/hooks/` and `services/`
- ❌ `infrastructure/repositories/` - Moved to `features/*/services/`
- ❌ `presentation/` - Split into `features/` and `shared/`
- ❌ `di/container.ts` - Dependency injection eliminated

**Added**:
- ✅ `features/` - Self-contained feature modules
- ✅ `shared/` - Shared resources
- ✅ Barrel exports (`index.ts`) for public APIs

### Why We Migrated

1. **Faster Development**: 30 min vs 2 hours for new features
2. **Easier Navigation**: One folder vs four layers
3. **Better Colocation**: Related code together
4. **Simpler Mental Model**: "Go to feature folder"
5. **Modern Patterns**: Aligns with React best practices

---

## FAQ

### When should I create a new feature?
When you have a distinct area of functionality (e.g., products, cart, orders, auth).

### When should code go in `shared/`?
When it's used in **2 or more features**.

### Can features communicate?
Yes, via:
1. Shared state (`shared/store/`)
2. Events/callbacks
3. URL params
4. Public APIs (barrel exports)

### What about testing?
- Unit tests: Next to the file (`MyComponent.test.tsx`)
- Integration tests: In `__tests__/` within the feature
- E2E tests: In root `e2e/` folder

### How do I handle shared types?
Start in the feature. Move to `shared/types/` when used in 2+ features.

### How do I implement table search?
Use the global `<TableSearch />` component from `@shared/components/table/TableSearch`. It automatically searches across all columns.

---

## Conclusion

This architecture prioritizes:
- 🚀 **Speed**: Faster development
- 🎯 **Simplicity**: Easier to understand
- 📦 **Colocation**: Related code together
- 🔧 **Pragmatism**: Add complexity only when needed

**Trade-off**: Less "pure" architecture, more practical architecture.

**Best for**: Product teams shipping features quickly while maintaining quality.
