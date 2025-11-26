import { GetUser } from "@/core/usecases/GetUser";
import { UserApiRepository } from "@/infrastructure/repositories/UserApiRepository";
import { GetInventory } from "@/core/usecases/GetInventory";
import { GetDashboardStats } from "@/core/usecases/GetDashboardStats";
import { MockInventoryRepository } from "@/infrastructure/repositories/MockInventoryRepository";

// Composition Root
const userRepository = new UserApiRepository();
const getUserUseCase = new GetUser(userRepository);

const inventoryRepository = new MockInventoryRepository();
const getInventoryUseCase = new GetInventory(inventoryRepository);
const getDashboardStatsUseCase = new GetDashboardStats(inventoryRepository);

export const di = {
    getUser: getUserUseCase,
    getInventory: getInventoryUseCase,
    getDashboardStats: getDashboardStatsUseCase,
};
