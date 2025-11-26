import { Home, Package, ShoppingCart, Users, FileText, Menu } from "lucide-react";
import { useAppStore } from "@shared/store/appStore";
import { Button } from "@shared/components/ui/button";
import { Separator } from "@shared/components/ui/separator";

const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Inventory", icon: Package },
    { name: "Orders", icon: ShoppingCart },
    { name: "Customers", icon: Users },
    { name: "Reports", icon: FileText },
];

export const Sidebar = () => {
    const { sidebarOpen, selectedMenu, toggleSidebar, setSelectedMenu } = useAppStore();

    if (!sidebarOpen) {
        return (
            <div className="w-16 border-r bg-slate-50 flex flex-col items-center py-4">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
        );
    }

    return (
        <div className="w-64 border-r bg-slate-50 flex flex-col">
            <div className="p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">AutoParts Store</h2>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
            <Separator />
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isSelected = selectedMenu === item.name;
                        return (
                            <li key={item.name}>
                                <Button
                                    variant={isSelected ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setSelectedMenu(item.name)}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
