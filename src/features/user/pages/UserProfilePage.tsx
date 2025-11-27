import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../hooks/useUser";
import { userIdSelectorSchema, type UserIdFormData } from "@shared/lib/validations";
import { Input } from "@shared/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";

export const UserProfilePage: React.FC = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useForm<UserIdFormData>({
        resolver: zodResolver(userIdSelectorSchema),
        defaultValues: {
            userId: 1,
        },
    });

    const userId = watch("userId");
    const { data: user, isLoading: loading, error } = useUser(userId);

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">User Profile Demo</h1>

            {/* User ID Selector Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Select User</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label htmlFor="userId" className="text-sm font-medium mb-2 block">
                                User ID (1-10)
                            </label>
                            <Input
                                id="userId"
                                type="number"
                                {...register("userId", { valueAsNumber: true })}
                                min="1"
                                max="10"
                                className={errors.userId ? "border-red-500" : ""}
                            />
                            {errors.userId && (
                                <p className="text-sm text-red-500 mt-1">{errors.userId.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* User Data Display */}
            {loading && (
                <Card>
                    <CardContent className="py-8">
                        <p className="text-center text-muted-foreground">Loading user data...</p>
                    </CardContent>
                </Card>
            )}

            {error && (
                <Card className="border-red-200">
                    <CardContent className="py-8">
                        <p className="text-center text-red-500">Error: {error.message}</p>
                    </CardContent>
                </Card>
            )}

            {user && !loading && (
                <Card>
                    <CardHeader>
                        <CardTitle>{user.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <span className="font-semibold">Email:</span>{" "}
                            <span className="text-muted-foreground">{user.email}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Website:</span>{" "}
                            <a
                                href={`https://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {user.website}
                            </a>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
