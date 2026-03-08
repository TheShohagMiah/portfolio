import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z.string().min(3, "Title too short").max(100),
  description: z.string().min(10, "Description too short").max(5000),

  image: z
    .object({
      url: z.string().url("Invalid image URL"),
      public_id: z.string().min(1, "Public ID is required"),
    })
    .optional(),

  category: z.enum(["Full Stack", "Frontend", "Backend"], {
    errorMap: () => ({
      message: "Category must be Full Stack, Frontend, or Backend",
    }),
  }),

  status: z.enum(["published", "pending", "draft"], {
    errorMap: () => ({
      message: "Status must be published, pending, or draft",
    }),
  }),

  technologies: z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    },
    z.array(z.string()).min(1, "At least one technology required"),
  ),

  githubRepo: z.string().url().or(z.string().startsWith("#")),
  liveLink: z.string().url().or(z.string().startsWith("#")),

  order: z.preprocess(
    (val) => (val === undefined || val === "" ? undefined : Number(val)),
    z.number().optional(),
  ),
});

export const updateProjectSchema = projectValidationSchema.partial();
