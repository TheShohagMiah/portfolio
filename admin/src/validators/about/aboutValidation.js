import { z } from "zod";

export const aboutValidationSchema = z.object({
  // ── Executive Summary ──────────────────────────────────────────
  title: z.string().min(1, "Title is required").trim(),
  bio: z.string().min(20, "Bio should be at least 20 characters").trim(),

  // ── Quick Stats ────────────────────────────────────────────────
  experienceYears: z.string().default(""), // free-text e.g. "3.5+ Years"
  location: z.string().default(""),
  freelanceStatus: z.enum(["available", "busy", "unavailable"]),

  // ── Academic Timeline ──────────────────────────────────────────
  education: z
    .array(
      z.object({
        courseTitle: z.string().min(1, "Course title is required"),
        subject: z.string().min(1, "Subject is required"),
        institution: z.string().min(1, "Institution is required"),
        description: z.string().optional().default(""),
        duration: z.object({
          from: z.string().min(1, "Start year is required"),
          to: z.string().min(1, "End year is required"),
        }),
      }),
    )
    .default([]),

  profileImage: z
    .object({
      url: z.string().optional(),
      public_id: z.string().optional(),
    })
    .optional(),

  resumeUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.string().length(0)),
});
