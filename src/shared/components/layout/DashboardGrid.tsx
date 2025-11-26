import type { ReactNode } from "react";
import { cn } from "@shared/lib/utils";

interface DashboardGridProps {
    children: ReactNode;
    columns?: 1 | 2 | 3 | 4;
    className?: string;
}

export const DashboardGrid = ({
    children,
    columns = 4,
    className,
}: DashboardGridProps) => {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 lg:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <div
            className={cn(
                "grid gap-6",
                gridCols[columns],
                className
            )}
        >
            {children}
        </div>
    );
};
