import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    size: z.number().min(1, "Invalid size"),
    price: z.number().min(1, "Invalid price"),
    image: z.string().min(1, "Name is required"),
    status: z.string().min(1, "Status is required"),
});