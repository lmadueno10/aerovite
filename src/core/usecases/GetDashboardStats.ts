import type { DashboardStats } from "@/core/domain/DashboardStats";
import type { InventoryRepository } from "@/core/domain/InventoryRepository";

export class GetDashboardStats {
    private inventoryRepository: InventoryRepository;

    constructor(inventoryRepository: InventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async execute(): Promise<DashboardStats> {
        return this.inventoryRepository.getDashboardStats();
    }
}
