import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@shared/lib/validations";
import { authService } from "../services/authService";
import { AuthLayout } from "../components/AuthLayout";

export const ForgotPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setIsLoading(true);
            await authService.forgotPassword(data);
            setIsSuccess(true);
        } catch (error) {
            console.error("Forgot password failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <AuthLayout>
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            We've sent you a password reset link. Please check your inbox.
                        </p>
                    </div>

                    <Link to="/login">
                        <Button className="w-full">Back to sign in</Button>
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Forgot your password?</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        No worries! Enter your email and we'll send you a reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email")}
                            className="mt-1"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send reset link"}
                    </Button>
                </form>

                {/* Back to sign in */}
                <p className="text-center text-sm text-gray-600">
                    <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                        ← Back to sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};
