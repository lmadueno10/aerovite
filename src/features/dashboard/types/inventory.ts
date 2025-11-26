export interface AutoPart {
    id: number;
    name: string;
    sku: string;
    stock: number;
    price: number;
    category: string;
}

export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
}

export interface InventoryRepository {
    getInventory(): Promise<AutoPart[]>;
    getDashboardStats(): Promise<DashboardStats>;
}
