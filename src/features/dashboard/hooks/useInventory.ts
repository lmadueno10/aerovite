import { useQuery } from '@shared/lib/react-query';
import { queryKeys } from '@shared/lib/react-query';
import { inventoryService } from "../services/inventoryService";

export function useInventory() {
    return useQuery({
        queryKey: queryKeys.dashboard.inventory(),
        queryFn: inventoryService.getInventory,
    });
}
