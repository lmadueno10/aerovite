import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const DashboardSubPage = () => {
    const location = useLocation();
    const getTitle = () => {
        const path = location.pathname.split("/").pop();
        if (!path) return "Dashboard";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
