import { PageContainer } from "@shared/components/layout/PageContainer";
import { DashboardGrid } from "@shared/components/layout/DashboardGrid";
import { KPIMetricCard } from "../components/KPIMetricCard";
import { RevenueChart } from "../components/RevenueChart";
import { LowStockWidget } from "../components/LowStockWidget";
import { InventoryTable } from "../components/InventoryTable";
import { useDashboardMetrics, useRevenueData, useLowStockItems } from "../hooks/useDashboardMetrics";
import { useInventory } from "../hooks/useInventory";

export const DashboardPage = () => {
    const { data: metrics = [], isLoading: metricsLoading } = useDashboardMetrics();
    const { data: revenueData = [], isLoading: revenueLoading } = useRevenueData();
    const { data: lowStockItems = [], isLoading: lowStockLoading } = useLowStockItems();
    const { data: inventory = [], isLoading: inventoryLoading } = useInventory();

    return (
        <PageContainer
            title="Dashboard Overview"
            description="Monitor your auto parts business performance"
        >
            <div className="space-y-6">
                {/* KPI Metrics */}
                <DashboardGrid columns={4}>
                    {metricsLoading ? (
                        <div className="col-span-4 text-center py-8 text-gray-500">
                            Loading metrics...
                        </div>
                    ) : (
                        metrics.map((metric) => (
                            <KPIMetricCard
                                key={metric.id}
                                title={metric.title}
                                value={metric.value}
                                trend={metric.trend}
                                trendLabel={metric.trendLabel}
                                icon={metric.icon}
                                sparkline={metric.sparkline}
                                isCurrency={metric.id === 'revenue'}
                                isPercentage={metric.id === 'conversion'}
                            />
                        ))
                    )}
                </DashboardGrid>

                {/* Revenue Chart and Low Stock */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <RevenueChart data={revenueData} loading={revenueLoading} />
                    </div>
                    <div>
                        <LowStockWidget items={lowStockItems} loading={lowStockLoading} />
                    </div>
                </div>

                {/* Inventory Table */}
                <InventoryTable inventory={inventory} loading={inventoryLoading} />
            </div>
        </PageContainer>
    );
};
