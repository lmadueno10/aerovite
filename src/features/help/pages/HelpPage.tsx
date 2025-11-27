import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const HelpPage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/help") return "Help & Support";
        const path = location.pathname.split("/").pop();
        if (!path) return "Help";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
