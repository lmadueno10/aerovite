import {
    Home,
    LayoutDashboard,
    TrendingUp,
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    FileText,
    Settings,
    HelpCircle,
    BarChart3,
    Activity,
    FileBarChart,
    PieChart,
    Target,
    Globe,
    ListOrdered,
    Clock,
    RefreshCcw,
    PackagePlus,
    PackageSearch,
    Boxes,
    AlertCircle,
    UsersRound,
    Award,
    MessageSquare,
    Receipt,
    FileSpreadsheet,
    CreditCard,
    Wallet,
    BarChart2,
    Calendar,
    Sliders,
    User,
    Bell,
    Key,
    Plug,
    BookOpen,
    Mail,
    Sparkles,
} from "lucide-react";
import type { SidebarConfig } from "@shared/types/navigation";

export const sidebarConfig: SidebarConfig = {
    mainNav: [
        {
            title: "Home",
            href: "/",
            icon: Home,
        },
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            children: [
                {
                    title: "Overview",
                    href: "/dashboard",
                    icon: BarChart3,
                },
                {
                    title: "Sales Analytics",
                    href: "/dashboard/sales",
                    icon: TrendingUp,
                },
                {
                    title: "Real-time Monitor",
                    href: "/dashboard/realtime",
                    icon: Activity,
                },
                {
                    title: "Custom Reports",
                    href: "/dashboard/reports",
                    icon: FileBarChart,
                },
            ],
        },
        {
            title: "Analytics",
            href: "/analytics",
            icon: PieChart,
            children: [
                {
                    title: "Revenue Analysis",
                    href: "/analytics/revenue",
                    icon: DollarSign,
                },
                {
                    title: "Customer Insights",
                    href: "/analytics/customers",
                    icon: Users,
                },
                {
                    title: "Product Performance",
                    href: "/analytics/products",
                    icon: Package,
                },
                {
                    title: "Conversion Funnels",
                    href: "/analytics/funnels",
                    icon: Target,
                },
                {
                    title: "Traffic Sources",
                    href: "/analytics/traffic",
                    icon: Globe,
                },
            ],
        },
        {
            title: "Orders",
            href: "/orders",
            icon: ShoppingCart,
            badge: "12",
            children: [
                {
                    title: "All Orders",
                    href: "/orders",
                    icon: ListOrdered,
                },
                {
                    title: "Pending Orders",
                    href: "/orders/pending",
                    icon: Clock,
                    badge: "8",
                },
                {
                    title: "Shipped Orders",
                    href: "/orders/shipped",
                    icon: Package,
                },
                {
                    title: "Returns & Refunds",
                    href: "/orders/returns",
                    icon: RefreshCcw,
                },
                {
                    title: "Create Order",
                    href: "/orders/create",
                    icon: PackagePlus,
                },
            ],
        },
        {
            title: "Products",
            href: "/products",
            icon: Package,
            children: [
                {
                    title: "All Products",
                    href: "/products",
                    icon: PackageSearch,
                },
                {
                    title: "Add Product",
                    href: "/products/add",
                    icon: PackagePlus,
                },
                {
                    title: "Categories",
                    href: "/products/categories",
                    icon: Boxes,
                },
                {
                    title: "Inventory Management",
                    href: "/products/inventory",
                    icon: Package,
                },
                {
                    title: "Low Stock Alerts",
                    href: "/products/low-stock",
                    icon: AlertCircle,
                    badge: "3",
                },
            ],
        },
        {
            title: "Customers",
            href: "/customers",
            icon: Users,
            children: [
                {
                    title: "All Customers",
                    href: "/customers",
                    icon: UsersRound,
                },
                {
                    title: "Segments",
                    href: "/customers/segments",
                    icon: Target,
                },
                {
                    title: "Loyalty Program",
                    href: "/customers/loyalty",
                    icon: Award,
                },
                {
                    title: "Reviews & Feedback",
                    href: "/customers/reviews",
                    icon: MessageSquare,
                },
            ],
        },
        {
            title: "Finance",
            href: "/finance",
            icon: DollarSign,
            children: [
                {
                    title: "Transactions",
                    href: "/finance/transactions",
                    icon: Receipt,
                },
                {
                    title: "Invoices",
                    href: "/finance/invoices",
                    icon: FileSpreadsheet,
                },
                {
                    title: "Tax Reports",
                    href: "/finance/tax",
                    icon: FileText,
                },
                {
                    title: "Payment Methods",
                    href: "/finance/payments",
                    icon: CreditCard,
                },
            ],
        },
        {
            title: "Reports",
            href: "/reports",
            icon: FileText,
            children: [
                {
                    title: "Sales Reports",
                    href: "/reports/sales",
                    icon: BarChart2,
                },
                {
                    title: "Inventory Reports",
                    href: "/reports/inventory",
                    icon: Package,
                },
                {
                    title: "Financial Reports",
                    href: "/reports/financial",
                    icon: Wallet,
                },
                {
                    title: "Custom Reports",
                    href: "/reports/custom",
                    icon: Sliders,
                },
                {
                    title: "Scheduled Reports",
                    href: "/reports/scheduled",
                    icon: Calendar,
                },
            ],
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            children: [
                {
                    title: "General",
                    href: "/settings/general",
                    icon: Sliders,
                },
                {
                    title: "Profile",
                    href: "/settings/profile",
                    icon: User,
                },
                {
                    title: "Team & Users",
                    href: "/settings/team",
                    icon: Users,
                },
                {
                    title: "Billing",
                    href: "/settings/billing",
                    icon: CreditCard,
                },
                {
                    title: "Notifications",
                    href: "/settings/notifications",
                    icon: Bell,
                },
                {
                    title: "API Keys",
                    href: "/settings/api",
                    icon: Key,
                },
                {
                    title: "Integrations",
                    href: "/settings/integrations",
                    icon: Plug,
                },
            ],
        },
        {
            title: "Help & Support",
            href: "/help",
            icon: HelpCircle,
            children: [
                {
                    title: "Documentation",
                    href: "/help/docs",
                    icon: BookOpen,
                },
                {
                    title: "Contact Support",
                    href: "/help/contact",
                    icon: Mail,
                },
                {
                    title: "What's New",
                    href: "/help/whats-new",
                    icon: Sparkles,
                },
            ],
        },
    ],
    bottomNav: [
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
        },
        {
            title: "Help",
            href: "/help",
            icon: HelpCircle,
        },
    ],
};
