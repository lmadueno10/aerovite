import { cn } from "@shared/lib/utils";
import type { NavItem } from "@shared/types/navigation";
import { useSidebarStore } from "@shared/store/sidebarStore";
import { Badge } from "@shared/components/ui/badge";

interface SidebarNavItemProps {
    item: NavItem;
    currentPath?: string;
}

export const SidebarNavItem = ({ item, currentPath }: SidebarNavItemProps) => {
    const { isCollapsed } = useSidebarStore();
    const Icon = item.icon;
    const isActive = currentPath === item.href;

    return (
        <a
            href={item.href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? item.title : undefined}
        >
            <Icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed && "h-6 w-6")} />

            {!isCollapsed && (
                <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                            {item.badge}
                        </Badge>
                    )}
                </>
            )}
        </a>
    );
};
