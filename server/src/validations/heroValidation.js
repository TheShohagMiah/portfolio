import { z } from "zod";

export const heroValidationSchema = z.object({
  title: z
    .string({ required_error: "Please add a headline" })
    .trim()
    .min(3, "Headline cannot be empty"),

  subTitle: z
    .string({ required_error: "Please add a sub-headline" })
    .trim()
    .min(3, "Sub-headline cannot be empty"),

  description: z
    .string({ required_error: "Please add a brief description" })
    .trim()
    .min(10, "Description should be at least 10 characters"),

  ctaText: z.string().trim().default("view works"),

  ctaLink: z
    .string()
    .trim()
    .startsWith(
      "/",
      "Link should be an internal path (starting with /) or a valid URL",
    )
    .default("/works"),

  socialLinks: z
    .array(
      z.object({
        platform: z.string().min(1, "Platform name is required"),
        url: z.string().url("Must be a valid URL"),
      }),
    )
    .optional()
    .default([]),

  isActive: z.boolean().default(true),
});

export const updateHeroSchema = heroValidationSchema.partial();
