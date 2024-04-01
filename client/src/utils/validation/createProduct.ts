import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 8 * 1024 * 1024;
export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    size: z.string().refine((str) => (isNaN(Number(str)) || Number(str) < 1) ? false : true, "Invalid size"),
    price: z.string().refine((str) => (isNaN(Number(str)) || Number(str) < 1) ? false : true, "Invalid price"),
    image: z.any()
        .refine(file => file.length == 1 ? true : false, 'Image is required')
        .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false, 'Invalid file. choose either JPEG or PNG image')
        .refine(file => file[0]?.size <= MAX_FILE_SIZE ? true : false, 'Max file size allowed is 8MB.'),
    status: z.string().min(1, "Status is required"),
});