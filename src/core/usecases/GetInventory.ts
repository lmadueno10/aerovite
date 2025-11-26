import type { AutoPart } from "@/core/domain/AutoPart";
import type { InventoryRepository } from "@/core/domain/InventoryRepository";

export class GetInventory {
    private inventoryRepository: InventoryRepository;

    constructor(inventoryRepository: InventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async execute(): Promise<AutoPart[]> {
        return this.inventoryRepository.getInventory();
    }
}
