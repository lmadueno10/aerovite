import { PageContainer } from "@shared/components/layout/PageContainer";
import { DashboardGrid } from "@shared/components/layout/DashboardGrid";
import { StatsCards } from "../components/StatsCards";
import { InventoryTable } from "../components/InventoryTable";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useInventory } from "../hooks/useInventory";

export const DashboardPage = () => {
    const { data: stats, isLoading: statsLoading } = useDashboardStats();
    const { data: inventory = [], isLoading: inventoryLoading } = useInventory();

    return (
        <PageContainer
            title="Dashboard Overview"
            description="Monitor your auto parts business performance"
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <DashboardGrid columns={4}>
                    <StatsCards stats={stats} loading={statsLoading} />
                </DashboardGrid>

                {/* Inventory Table */}
                <InventoryTable inventory={inventory} loading={inventoryLoading} />
            </div>
        </PageContainer>
    );
};
