import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Button } from "@shared/components/ui/button";


interface RevenueChartProps {
    data: Array<{ date: string; revenue: number; cost: number; profit: number }>;
    loading?: boolean;
}

type DateRange = '7d' | '30d' | '90d';

export const RevenueChart = ({ data, loading = false }: RevenueChartProps) => {
    const [selectedRange, setSelectedRange] = useState<DateRange>('30d');

    if (loading) {
        return (
            <Card className="rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-80">
                        <p className="text-gray-500">Loading chart...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-xl shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Revenue Overview</CardTitle>
                    <div className="flex items-center gap-2">
                        {(['7d', '30d', '90d'] as DateRange[]).map((range) => (
                            <Button
                                key={range}
                                variant={selectedRange === range ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedRange(range)}
                                className="h-8 text-xs"
                            >
                                {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="date"
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                                formatter={(value: number) => `$${value.toLocaleString()}`}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#colorRevenue)"
                                name="Revenue"
                            />
                            <Area
                                type="monotone"
                                dataKey="cost"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fill="url(#colorCost)"
                                name="Cost"
                            />
                            <Area
                                type="monotone"
                                dataKey="profit"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="url(#colorProfit)"
                                name="Profit"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
