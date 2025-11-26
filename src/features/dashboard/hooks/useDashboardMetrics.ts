import { useQuery } from '@shared/lib/react-query';
import { mockMetrics, mockRevenueData, mockLowStockItems } from '../mocks/metrics';

export function useDashboardMetrics() {
    return useQuery({
        queryKey: ['dashboard', 'metrics'],
        queryFn: async () => {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 300));
            return mockMetrics;
        },
    });
}

export function useRevenueData(period: '7d' | '30d' | '90d' = '30d') {
    return useQuery({
        queryKey: ['dashboard', 'revenue', period],
        queryFn: async () => {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 400));
            return mockRevenueData;
        },
    });
}

export function useLowStockItems() {
    return useQuery({
        queryKey: ['dashboard', 'low-stock'],
        queryFn: async () => {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 250));
            return mockLowStockItems;
        },
    });
}
