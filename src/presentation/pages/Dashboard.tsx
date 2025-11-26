import { Sidebar } from "@/presentation/components/dashboard/Sidebar";
import { StatsCards } from "@/presentation/components/dashboard/StatsCards";
import { InventoryTable } from "@/presentation/components/dashboard/InventoryTable";
import { useDashboardStats } from "@/presentation/hooks/useDashboardStats";
import { useInventory } from "@/presentation/hooks/useInventory";

export const Dashboard = () => {
    const { stats, loading: statsLoading } = useDashboardStats();
    const { inventory, loading: inventoryLoading } = useInventory();

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-white">
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                    <div className="space-y-8">
                        <StatsCards stats={stats} loading={statsLoading} />
                        <InventoryTable inventory={inventory} loading={inventoryLoading} />
                    </div>
                </div>
            </main>
        </div>
    );
};
