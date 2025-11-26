import type { ReactNode } from "react";
import { cn } from "@shared/lib/utils";

interface PageContainerProps {
    children: ReactNode;
    title?: string;
    description?: string;
    actions?: ReactNode;
    className?: string;
}

export const PageContainer = ({
    children,
    title,
    description,
    actions,
    className,
}: PageContainerProps) => {
    return (
        <div className={cn("flex flex-col h-full", className)}>
            {/* Header */}
            {(title || description || actions) && (
                <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            {title && (
                                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-gray-500">{description}</p>
                            )}
                        </div>
                        {actions && <div className="flex items-center gap-3">{actions}</div>}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {children}
            </div>
        </div>
    );
};
