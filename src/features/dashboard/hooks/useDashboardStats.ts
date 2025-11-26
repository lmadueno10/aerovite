import { useQuery } from '@shared/lib/react-query';
import { queryKeys } from '@shared/lib/react-query';
import { inventoryService } from "../services/inventoryService";

export function useDashboardStats() {
    return useQuery({
        queryKey: queryKeys.dashboard.stats(),
        queryFn: inventoryService.getDashboardStats,
    });
}
