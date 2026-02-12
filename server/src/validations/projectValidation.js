import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z.string().min(3, "Title too short").max(100),
  description: z.string().min(10, "Description too short").max(500),

  image: z
    .object({
      url: z.string().url("Invalid image URL"),
      public_id: z.string().min(1, "Public ID is required"),
    })
    .optional(),

  category: z.enum(["Full Stack", "Frontend", "Backend"], {
    error_map: () => ({
      message: "Category must be Full Stack, Frontend or Backend",
    }),
  }),

  technologies: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),
    z.array(z.string()).min(1, "At least one technology required"),
  ),

  github: z.string().url().or(z.string().startsWith("#")),
  live: z.string().url().or(z.string().startsWith("#")),
  order: z.preprocess((val) => Number(val), z.number().optional()),
});

export const updateProjectSchema = projectValidationSchema.partial();
