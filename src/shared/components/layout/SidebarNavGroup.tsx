import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type { NavItem } from "@shared/types/navigation";
import { useSidebarStore } from "@shared/store/sidebarStore";
import { Badge } from "@shared/components/ui/badge";

interface SidebarNavGroupProps {
    item: NavItem;
    currentPath?: string;
}

export const SidebarNavGroup = ({ item, currentPath }: SidebarNavGroupProps) => {
    const { isCollapsed } = useSidebarStore();
    const [isExpanded, setIsExpanded] = useState(
        currentPath?.startsWith(item.href) || false
    );

    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;

    const isActive = currentPath === item.href || currentPath?.startsWith(item.href + "/");

    const handleClick = () => {
        if (hasChildren && !isCollapsed) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    isCollapsed && "justify-center px-2"
                )}
            >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed && "h-6 w-6")} />

                {!isCollapsed && (
                    <>
                        <span className="flex-1 text-left">{item.title}</span>

                        {item.badge && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                                {item.badge}
                            </Badge>
                        )}

                        {hasChildren && (
                            <div className="transition-transform duration-200">
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                        )}
                    </>
                )}
            </button>

            {/* Children with smooth animation */}
            {hasChildren && !isCollapsed && (
                <div
                    className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="ml-5 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                        {item.children?.map((child) => {
                            const ChildIcon = child.icon;
                            const isChildActive = currentPath === child.href;

                            return (
                                <a
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                                        isChildActive
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    )}
                                >
                                    <ChildIcon className="h-4 w-4 flex-shrink-0" />
                                    <span className="flex-1">{child.title}</span>
                                    {child.badge && (
                                        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                                            {child.badge}
                                        </Badge>
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
