import { useState, useEffect } from "react";
import type { User } from "@/core/domain/User";
import { di } from "@/di/container";

export function useUser(id: number) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        di.getUser
            .execute(id)
            .then(setUser)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    return { user, loading, error };
}
