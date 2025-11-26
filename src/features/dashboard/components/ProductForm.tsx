import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormData } from "@shared/lib/validations";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";

interface ProductFormProps {
    onSubmit: (data: ProductFormData) => void;
    defaultValues?: Partial<ProductFormData>;
    isLoading?: boolean;
}

export const ProductForm = ({
    onSubmit,
    defaultValues,
    isLoading = false,
}: ProductFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema),
        defaultValues,
    });

    const handleFormSubmit = (data: ProductFormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Form</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium mb-2 block">
                            Product Name *
                        </label>
                        <Input
                            id="name"
                            {...register("name")}
                            placeholder="Enter product name"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="sku" className="text-sm font-medium mb-2 block">
                            SKU *
                        </label>
                        <Input
                            id="sku"
                            {...register("sku")}
                            placeholder="e.g., BP-001"
                            className={errors.sku ? "border-red-500" : ""}
                        />
                        {errors.sku && (
                            <p className="text-sm text-red-500 mt-1">{errors.sku.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="text-sm font-medium mb-2 block">
                                Price *
                            </label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register("price", { valueAsNumber: true })}
                                placeholder="0.00"
                                className={errors.price ? "border-red-500" : ""}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="stock" className="text-sm font-medium mb-2 block">
                                Stock *
                            </label>
                            <Input
                                id="stock"
                                type="number"
                                {...register("stock", { valueAsNumber: true })}
                                placeholder="0"
                                className={errors.stock ? "border-red-500" : ""}
                            />
                            {errors.stock && (
                                <p className="text-sm text-red-500 mt-1">{errors.stock.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="text-sm font-medium mb-2 block">
                            Category *
                        </label>
                        <Input
                            id="category"
                            {...register("category")}
                            placeholder="e.g., Brakes"
                            className={errors.category ? "border-red-500" : ""}
                        />
                        {errors.category && (
                            <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Product"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => reset()}>
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
