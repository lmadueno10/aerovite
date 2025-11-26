import type { AutoPart } from "./AutoPart";
import type { DashboardStats } from "./DashboardStats";

export interface InventoryRepository {
    getInventory(): Promise<AutoPart[]>;
    getDashboardStats(): Promise<DashboardStats>;
}
