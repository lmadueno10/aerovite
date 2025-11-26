export interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    children?: NavItem[];
}

export interface SidebarConfig {
    mainNav: NavItem[];
    bottomNav: NavItem[];
}
