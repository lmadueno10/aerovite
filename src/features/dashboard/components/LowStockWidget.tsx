import { AlertCircle, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Badge } from "@shared/components/ui/badge";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/lib/utils";
import type { LowStockItem } from "../mocks/metrics";

interface LowStockWidgetProps {
    items: LowStockItem[];
    loading?: boolean;
}

export const LowStockWidget = ({ items, loading = false }: LowStockWidgetProps) => {
    if (loading) {
        return (
            <Card className="rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        Low Stock Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">Loading alerts...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-xl shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Low Stock Alerts
                    <Badge variant="destructive" className="ml-auto">
                        {items.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.map((item) => {
                        const isCritical = item.stock < 10;

                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
                                    <Package className="h-5 w-5 text-gray-600" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        SKU: {item.sku} • {item.category}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p
                                            className={cn(
                                                "text-sm font-semibold",
                                                isCritical ? "text-red-600" : "text-orange-600"
                                            )}
                                        >
                                            {item.stock} units
                                        </p>
                                        <Badge
                                            variant={isCritical ? "destructive" : "warning"}
                                            className="text-xs"
                                        >
                                            {isCritical ? "Critical" : "Low"}
                                        </Badge>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-xs"
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No low stock items</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
