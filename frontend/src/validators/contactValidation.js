import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Name must not exceed 60 characters.")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes.",
    ),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address.")
    .max(100, "Email must not exceed 100 characters."),

  phone: z
    .union([
      z
        .string()
        .trim()
        .regex(
          /^\+?[1-9]\d{1,14}$/,
          "Enter a valid phone number. e.g. +35794566173",
        ),
      z.literal(""), // allow empty string
    ])
    .optional(),

  subject: z
    .string({ required_error: "Subject is required." })
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(100, "Subject must not exceed 100 characters."),

  message: z
    .string({ required_error: "Message is required." })
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(2000, "Message must not exceed 2000 characters."),
});
