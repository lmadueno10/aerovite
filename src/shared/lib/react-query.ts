import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys factory for consistent cache key management
export const queryKeys = {
    dashboard: {
        all: ['dashboard'] as const,
        stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
        inventory: () => [...queryKeys.dashboard.all, 'inventory'] as const,
    },
    user: {
        all: ['user'] as const,
        detail: (id: number) => [...queryKeys.user.all, id] as const,
    },
    products: {
        all: ['products'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.products.all, 'list', filters] as const,
        detail: (id: number) => [...queryKeys.products.all, id] as const,
    },
} as const;

// Re-export commonly used hooks and types
export { useQuery, useMutation, useQueryClient };
export type { QueryClient } from '@tanstack/react-query';

