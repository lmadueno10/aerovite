import { useState, useEffect } from "react";
import type { AutoPart } from "@/core/domain/AutoPart";
import { di } from "@/di/container";

export function useInventory() {
    const [inventory, setInventory] = useState<AutoPart[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        di.getInventory
            .execute()
            .then(setInventory)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { inventory, loading, error };
}
