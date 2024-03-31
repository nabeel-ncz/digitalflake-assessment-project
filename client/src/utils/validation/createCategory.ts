import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    status: z.string().min(1, "Status is required")
});