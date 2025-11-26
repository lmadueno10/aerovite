import { useEffect, useState, type ReactNode } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, TrendingUp as TrendingUpIcon } from "lucide-react";
import { Card } from "@shared/components/ui/card";
import { cn } from "@shared/lib/utils";

interface KPIMetricCardProps {
    title: string;
    value: number;
    trend: number;
    trendLabel?: string;
    icon?: ReactNode;
    sparkline?: number[];
    isCurrency?: boolean;
    isPercentage?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp: TrendingUpIcon,
};

export const KPIMetricCard = ({
    title,
    value,
    trend,
    trendLabel = "vs last month",
    icon,
    sparkline = [],
    isCurrency = false,
    isPercentage = false,
}: KPIMetricCardProps) => {
    const [displayValue, setDisplayValue] = useState(0);
    const isPositiveTrend = trend > 0;
    const isNeutralTrend = trend === 0;

    // Count-up animation
    useEffect(() => {
        const duration = 1000; // 1 second
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    // Format value
    const formattedValue = isCurrency
        ? `$${displayValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        : isPercentage
            ? `${displayValue.toFixed(1)}%`
            : displayValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    // Transform sparkline data for Recharts
    const chartData = sparkline.map((value) => ({ value }));

    return (
        <Card className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                {icon && (
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        {typeof icon === 'string' ? (
                            (() => {
                                const IconComponent = iconMap[icon];
                                return IconComponent ? <IconComponent className="h-5 w-5 text-primary" /> : null;
                            })()
                        ) : (
                            icon
                        )}
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="mb-4">
                <p className="text-4xl font-bold text-gray-900">{formattedValue}</p>
            </div>

            {/* Trend */}
            <div className="flex items-center gap-2 mb-4">
                {!isNeutralTrend && (
                    <>
                        {isPositiveTrend ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span
                            className={cn(
                                "text-sm font-medium",
                                isPositiveTrend ? "text-green-600" : "text-red-600"
                            )}
                        >
                            {isPositiveTrend ? "+" : ""}
                            {trend.toFixed(1)}%
                        </span>
                    </>
                )}
                <span className="text-sm text-gray-500">{trendLabel}</span>
            </div>

            {/* Sparkline */}
            {chartData.length > 0 && (
                <div className="h-16 -mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="0%"
                                        stopColor={isPositiveTrend ? "#10b981" : "#ef4444"}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={isPositiveTrend ? "#10b981" : "#ef4444"}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isPositiveTrend ? "#10b981" : "#ef4444"}
                                strokeWidth={2}
                                fill={`url(#gradient-${title})`}
                                isAnimationActive={true}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    );
};
