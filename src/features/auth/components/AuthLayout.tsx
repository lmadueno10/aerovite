import type { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Aerovite</h2>
                </div>

                {/* Auth Form Content */}
                <div className="bg-white py-8 px-4 shadow-sm rounded-xl sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
