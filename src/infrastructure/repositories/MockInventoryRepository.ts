import type { AutoPart } from "@/core/domain/AutoPart";
import type { DashboardStats } from "@/core/domain/DashboardStats";
import type { InventoryRepository } from "@/core/domain/InventoryRepository";

export class MockInventoryRepository implements InventoryRepository {
    async getInventory(): Promise<AutoPart[]> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return [
            { id: 1, name: "Brake Pads", sku: "BP-001", stock: 45, price: 89.99, category: "Brakes" },
            { id: 2, name: "Oil Filter", sku: "OF-002", stock: 120, price: 12.99, category: "Filters" },
            { id: 3, name: "Air Filter", sku: "AF-003", stock: 85, price: 24.99, category: "Filters" },
            { id: 4, name: "Spark Plugs", sku: "SP-004", stock: 200, price: 8.99, category: "Ignition" },
            { id: 5, name: "Battery", sku: "BT-005", stock: 15, price: 149.99, category: "Electrical" },
            { id: 6, name: "Wiper Blades", sku: "WB-006", stock: 60, price: 19.99, category: "Accessories" },
            { id: 7, name: "Headlight Bulb", sku: "HB-007", stock: 95, price: 34.99, category: "Lighting" },
            { id: 8, name: "Radiator", sku: "RD-008", stock: 8, price: 299.99, category: "Cooling" },
        ];
    }

    async getDashboardStats(): Promise<DashboardStats> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        return {
            totalSales: 1247,
            totalOrders: 342,
            totalRevenue: 45678.50,
            totalProducts: 628,
        };
    }
}
