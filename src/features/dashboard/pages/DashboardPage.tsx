import { Sidebar } from "../components/Sidebar";
import { StatsCards } from "../components/StatsCards";
import { InventoryTable } from "../components/InventoryTable";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useInventory } from "../hooks/useInventory";

export const DashboardPage = () => {
    const { data: stats, isLoading: statsLoading } = useDashboardStats();
    const { data: inventory = [], isLoading: inventoryLoading } = useInventory();

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
