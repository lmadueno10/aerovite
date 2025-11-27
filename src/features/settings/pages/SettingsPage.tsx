import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const SettingsPage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/settings") return "Settings";
        const path = location.pathname.split("/").pop();
        if (!path) return "Settings";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
