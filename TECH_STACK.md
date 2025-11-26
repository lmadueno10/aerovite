# Technology Stack Integration Guide

## Overview

This document describes the modern technology stack integrated into Aerovite and how to use each tool effectively.

## Core Technologies

### 1. React Query (@tanstack/react-query)

**Purpose**: Server state management, data fetching, caching, and synchronization

#### Setup

React Query is configured in `src/App.tsx` with sensible defaults:
- **Stale Time**: 5 minutes
- **Cache Time (gcTime)**: 10 minutes
- **Refetch on Window Focus**: Disabled
- **Retry**: 1 attempt

#### Usage

**Query Keys** are centralized in `src/shared/lib/react-query.ts`:

```typescript
import { useQuery } from '@shared/lib/react-query';
import { queryKeys } from '@shared/lib/react-query';

// In your hook
export function useInventory() {
  return useQuery({
    queryKey: queryKeys.dashboard.inventory(),
    queryFn: inventoryService.getInventory,
  });
}
```

**In Components**:

```typescript
const { data, isLoading, error, refetch } = useInventory();

// data is undefined initially, then populated
// isLoading is true while fetching
// error contains any fetch errors
```

**Mutations** (for POST/PUT/DELETE):

```typescript
import { useMutation, useQueryClient } from '@shared/lib/react-query';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product) => productService.create(product),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}
```

**DevTools**: Available in development mode (bottom-right corner)

---

### 2. TanStack Table (@tanstack/react-table)

**Purpose**: Headless table library for building powerful data tables

#### Setup

A custom hook is provided in `src/shared/hooks/useDataTable.ts` with built-in:
- Sorting
- Filtering
- Pagination

#### Usage

**Define Columns**:

```typescript
import { type ColumnDef } from '@shared/hooks/useDataTable';
import type { AutoPart } from '../types/inventory';

const columns: ColumnDef<AutoPart>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
];
```

**Use the Hook**:

```typescript
import { useDataTable, flexRender } from '@shared/hooks/useDataTable';

function ProductTable({ data }: { data: AutoPart[] }) {
  const table = useDataTable({
    data,
    columns,
    pageSize: 10,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

**Pagination**:

```typescript
<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
  Previous
</button>
<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
  Next
</button>
```

---

### 3. React Hook Form + Zod

**Purpose**: Type-safe form validation and management

#### Setup

Zod schemas are defined in `src/shared/lib/validations.ts`

#### Usage

**Define Schema**:

```typescript
import { z } from 'zod';

const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().nonnegative('Stock cannot be negative'),
});

type ProductFormData = z.infer<typeof productFormSchema>;
```

**Use in Component**:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema, type ProductFormData } from '@shared/lib/validations';

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    console.log(data); // Type-safe!
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input type="number" {...register('price', { valueAsNumber: true })} />
      {errors.price && <span>{errors.price.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**With shadcn/ui Components**:

```typescript
import { Input } from '@shared/components/ui/input';
import { Button } from '@shared/components/ui/button';

<Input {...register('name')} placeholder="Product name" />
<Button type="submit">Save Product</Button>
```

---

### 4. Zustand

**Purpose**: Lightweight state management for global UI state

#### Setup

Global store is in `src/shared/store/appStore.ts`

#### Usage

**Access State**:

```typescript
import { useAppStore } from '@shared/store/appStore';

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  
  return (
    <div>
      {sidebarOpen && <nav>...</nav>}
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  );
}
```

**Create Feature Store**:

```typescript
// features/products/store/productStore.ts
import { create } from 'zustand';

interface ProductState {
  filters: Record<string, string>;
  sortBy: string;
  setFilters: (filters: Record<string, string>) => void;
  setSortBy: (sortBy: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  filters: {},
  sortBy: 'name',
  setFilters: (filters) => set({ filters }),
  setSortBy: (sortBy) => set({ sortBy }),
}));
```

---

## Conventional Commits Workflow

### Setup

The project uses:
- **Husky**: Git hooks
- **Commitlint**: Enforce commit message format
- **Commitizen**: Interactive commit CLI

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system or dependencies
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert a previous commit

**Examples**:

```bash
feat(dashboard): Add inventory filtering
fix(auth): Resolve token expiration issue
docs(readme): Update installation instructions
refactor(user): Simplify user service logic
```

### How to Commit

#### Option 1: Using Commitizen (Recommended)

```bash
npm run commit
```

This opens an interactive prompt that guides you through creating a properly formatted commit.

#### Option 2: Manual Commit

```bash
git add .
git commit -m "feat(dashboard): Add new stats card"
```

The `commit-msg` hook will validate your message format.

### Git Hooks

**pre-commit**: Runs `npm run lint` before every commit
- Ensures code quality
- Prevents committing code with lint errors

**commit-msg**: Validates commit message format
- Enforces Conventional Commits standard
- Rejects improperly formatted messages

### Bypassing Hooks (Use Sparingly)

```bash
git commit --no-verify -m "emergency fix"
```

---

## Best Practices

### React Query

1. **Use Query Keys Factory**: Always use `queryKeys` from `@shared/lib/react-query`
2. **Enable/Disable Queries**: Use `enabled` option for conditional fetching
3. **Invalidate on Mutations**: Always invalidate related queries after mutations
4. **Error Handling**: Handle `error` state in components

### TanStack Table

1. **Memoize Columns**: Use `useMemo` for column definitions
2. **Type Safety**: Always type your data with `ColumnDef<YourType>`
3. **Pagination**: Set appropriate `pageSize` based on UX needs
4. **Sorting**: Enable sorting for user-friendly tables

### Forms

1. **Schema First**: Define Zod schema before building form
2. **Type Inference**: Use `z.infer<typeof schema>` for types
3. **Error Display**: Always show validation errors to users
4. **Async Validation**: Use Zod's `.refine()` for custom async validation

### State Management

1. **Server State**: Use React Query (not Zustand)
2. **Global UI State**: Use Zustand in `shared/store/`
3. **Feature State**: Create feature-specific Zustand stores
4. **Component State**: Use `useState` for local state

### Commits

1. **Atomic Commits**: One logical change per commit
2. **Descriptive Messages**: Explain what and why, not how
3. **Scope**: Use feature names as scopes (dashboard, auth, products)
4. **Breaking Changes**: Use `BREAKING CHANGE:` in footer

---

## Migration from Old Code

### Before (Manual State Management)

```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
    .finally(() => setLoading(false));
}, []);
```

### After (React Query)

```typescript
const { data = [], isLoading } = useQuery({
  queryKey: ['data'],
  queryFn: () => fetch('/api/data').then(res => res.json()),
});
```

**Benefits**:
- Automatic caching
- Background refetching
- Deduplication
- Loading/error states
- DevTools

---

## Troubleshooting

### React Query Not Caching

**Issue**: Data refetches on every render

**Solution**: Check `staleTime` and `gcTime` in query options

### Commitlint Rejecting Valid Messages

**Issue**: Commit message fails validation

**Solution**: Ensure format is `type(scope): subject` with lowercase type

### Form Validation Not Working

**Issue**: Zod schema not validating

**Solution**: Ensure `zodResolver` is passed to `useForm`

### Table Not Sorting

**Issue**: Clicking headers doesn't sort

**Solution**: Ensure `getSortedRowModel()` is included in table config

---

## Next Steps

1. **Add More Schemas**: Create Zod schemas for all forms
2. **Implement Mutations**: Add create/update/delete operations with React Query
3. **Build Complex Tables**: Use TanStack Table for advanced features
4. **Optimize Queries**: Fine-tune staleTime and cacheTime per query
5. **Add Tests**: Test forms with React Testing Library

---

## Resources

- [React Query Docs](https://tanstack.com/query/latest)
- [TanStack Table Docs](https://tanstack.com/table/latest)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
