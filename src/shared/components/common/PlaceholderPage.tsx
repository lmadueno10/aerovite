import { Skeleton } from "@shared/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@shared/components/ui/alert";
import { Info } from "lucide-react";

interface PlaceholderPageProps {
    title: string;
}

export const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>

            {/* Message Alert */}
            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <Info className="h-4 w-4 text-blue-800" />
                <AlertTitle className="font-semibold">Development Notice</AlertTitle>
                <AlertDescription>
                    Jaime, these sections are not developed yet. This is only a mocked demo.
                </AlertDescription>
            </Alert>

            {/* Content Skeleton */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-3 w-full" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-9 w-64" />
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-[30%]" />
                                    <Skeleton className="h-3 w-[60%]" />
                                </div>
                                <Skeleton className="h-8 w-24" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
