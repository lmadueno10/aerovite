import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import type { DashboardStats } from "../types/inventory";


interface StatsCardsProps {
    stats: DashboardStats | undefined;
    loading: boolean;
}

export const StatsCards = ({ stats, loading }: StatsCardsProps) => {
    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Loading...</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">--</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const cards = [
        {
            title: "Total Sales",
            value: stats.totalSales.toLocaleString(),
            icon: TrendingUp,
            color: "text-green-600",
        },
        {
            title: "Total Orders",
            value: stats.totalOrders.toLocaleString(),
            icon: ShoppingCart,
            color: "text-blue-600",
        },
        {
            title: "Total Revenue",
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-yellow-600",
        },
        {
            title: "Total Products",
            value: stats.totalProducts.toLocaleString(),
            icon: Package,
            color: "text-purple-600",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <Icon className={`h-4 w-4 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
