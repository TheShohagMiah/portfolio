import { z } from "zod";

export const serviceValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title too short")
    .max(50, "Title too long"),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description should be more descriptive")
    .max(300, "Keep description concise"),

  icon: z.string({ required_error: "Icon identifier is required" }),

  tags: z.array(z.string()).min(1, "At least one tag is required"),

  order: z.number().optional().default(0),

  isActive: z.boolean().optional().default(true),
});

export const updateServiceSchema = serviceValidationSchema.partial();
