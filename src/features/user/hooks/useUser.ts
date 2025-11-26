import { useQuery } from '@shared/lib/react-query';
import { queryKeys } from '@shared/lib/react-query';
import { userService } from "../services/userService";

export function useUser(id: number) {
    return useQuery({
        queryKey: queryKeys.user.detail(id),
        queryFn: () => userService.getUser(id),
        enabled: id > 0, // Only fetch if valid ID
    });
}
