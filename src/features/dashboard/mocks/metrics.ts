export interface MetricData {
    id: string;
    title: string;
    value: number;
    trend: number; // percentage change
    trendLabel: string;
    sparkline: number[];
    icon?: string; // icon name from lucide-react
}

export const mockMetrics: MetricData[] = [
    {
        id: "revenue",
        title: "Total Revenue",
        value: 45678.50,
        trend: 12.4,
        trendLabel: "vs last month",
        sparkline: [30000, 32000, 35000, 33000, 38000, 40000, 42000, 45678],
        icon: "DollarSign",
    },
    {
        id: "orders",
        title: "Total Orders",
        value: 1247,
        trend: 8.2,
        trendLabel: "vs last month",
        sparkline: [1100, 1150, 1180, 1200, 1220, 1230, 1240, 1247],
        icon: "ShoppingCart",
    },
    {
        id: "customers",
        title: "Active Customers",
        value: 342,
        trend: -3.1,
        trendLabel: "vs last month",
        sparkline: [380, 375, 370, 360, 355, 350, 345, 342],
        icon: "Users",
    },
    {
        id: "conversion",
        title: "Conversion Rate",
        value: 4.5,
        trend: 1.8,
        trendLabel: "vs last month",
        sparkline: [3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.45, 4.5],
        icon: "TrendingUp",
    },
];

export interface RevenueDataPoint {
    date: string;
    revenue: number;
    cost: number;
    profit: number;
}

export const mockRevenueData: RevenueDataPoint[] = [
    { date: "Jan 1", revenue: 4200, cost: 2400, profit: 1800 },
    { date: "Jan 5", revenue: 4500, cost: 2600, profit: 1900 },
    { date: "Jan 10", revenue: 4800, cost: 2700, profit: 2100 },
    { date: "Jan 15", revenue: 5200, cost: 2900, profit: 2300 },
    { date: "Jan 20", revenue: 5500, cost: 3100, profit: 2400 },
    { date: "Jan 25", revenue: 5800, cost: 3200, profit: 2600 },
    { date: "Jan 30", revenue: 6200, cost: 3400, profit: 2800 },
];

export interface LowStockItem {
    id: number;
    name: string;
    sku: string;
    stock: number;
    threshold: number;
    category: string;
}

export const mockLowStockItems: LowStockItem[] = [
    { id: 1, name: "Brake Pads Premium", sku: "BP-001", stock: 8, threshold: 20, category: "Brakes" },
    { id: 2, name: "Oil Filter Standard", sku: "OF-002", stock: 12, threshold: 50, category: "Filters" },
    { id: 3, name: "Radiator Coolant", sku: "RD-008", stock: 5, threshold: 15, category: "Cooling" },
    { id: 4, name: "Spark Plugs Set", sku: "SP-004", stock: 15, threshold: 40, category: "Ignition" },
];
