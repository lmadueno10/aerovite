import { PanelLeftClose, PanelLeftOpen, User } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import { Separator } from "@shared/components/ui/separator";
import { sidebarConfig } from "@shared/config/sidebar";
import { useSidebarStore } from "@shared/store/sidebarStore";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { SidebarNavItem } from "./SidebarNavItem";

interface SidebarProps {
    currentPath?: string;
}

export const Sidebar = ({ currentPath = "/" }: SidebarProps) => {
    const { isCollapsed, toggleCollapse } = useSidebarStore();

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header with Logo and Collapse Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-gray-900">Aerovite</span>
                    </div>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleCollapse}
                    className={cn("h-8 w-8", isCollapsed && "mx-auto")}
                    title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? (
                        <PanelLeftOpen className="h-4 w-4" />
                    ) : (
                        <PanelLeftClose className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {sidebarConfig.mainNav.map((item) => {
                    if (item.children && item.children.length > 0) {
                        return (
                            <SidebarNavGroup
                                key={item.href}
                                item={item}
                                currentPath={currentPath}
                            />
                        );
                    }

                    return (
                        <SidebarNavItem
                            key={item.href}
                            item={item}
                            currentPath={currentPath}
                        />
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 p-3 space-y-3">
                <Separator className="my-2" />

                {/* User Profile */}
                <div
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
                        isCollapsed && "justify-center px-2"
                    )}
                >
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                    </div>

                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                Luis M
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                luis@aerovite.com
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
