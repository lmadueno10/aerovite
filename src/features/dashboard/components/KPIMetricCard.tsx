import { useEffect, useState, useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, TrendingUp as TrendingUpIcon } from "lucide-react";
import { Card } from "@shared/components/ui/card";
import { cn } from "@shared/lib/utils";

interface KPIMetricCardProps {
    title: string;
    value: number;
    trend: number;
    trendLabel?: string;
    icon?: string;
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
    const formattedValue = useMemo(() => {
        if (isCurrency) {
            return `$${displayValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        }
        if (isPercentage) {
            return `${displayValue.toFixed(1)}%`;
        }
        return displayValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }, [displayValue, isCurrency, isPercentage]);

    // Transform sparkline data for Recharts
    const chartData = useMemo(() => sparkline.map((value) => ({ value })), [sparkline]);

    return (
        <Card className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
            {/* Unified Layout Structure */}
            <div className="flex flex-col h-full p-6">
                {/* Header Row - Fixed Height */}
                <div className="flex items-start justify-between mb-3 h-10">
                    <h3 className="text-sm font-medium text-gray-600 leading-5">{title}</h3>
                    {icon && (
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
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

                {/* Value Row - Fixed Height */}
                <div className="mb-3 h-12 flex items-center">
                    <p className="text-4xl font-bold text-gray-900 leading-none">{formattedValue}</p>
                </div>

                {/* Trend Row - Fixed Height */}
                <div className="flex items-center gap-2 mb-4 h-6">
                    {!isNeutralTrend && (
                        <>
                            {isPositiveTrend ? (
                                <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-600 flex-shrink-0" />
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
                    <span className="text-sm text-gray-500 truncate">{trendLabel}</span>
                </div>

                {/* Sparkline Row - Fixed Height */}
                <div className="flex-1 min-h-[4rem]">
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
                </div>
            </div>
        </Card>
    );
};
