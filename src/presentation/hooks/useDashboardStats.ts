import { useState, useEffect } from "react";
import type { DashboardStats } from "@/core/domain/DashboardStats";
import { di } from "@/di/container";

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        di.getDashboardStats
            .execute()
            .then(setStats)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { stats, loading, error };
}
