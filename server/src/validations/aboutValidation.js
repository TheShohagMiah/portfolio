import { z } from "zod";

export const aboutValidationSchema = z.object({
  mainTitle: z.string().min(1).trim(),
  subTitle: z.string().min(1).trim(),
  bio: z.string().min(20, "Bio should be at least 20 characters"),

  experienceYears: z.string().default("0"),
  location: z.string().default("Remote"),
  freelanceStatus: z.enum(["Available", "Busy", "Not Looking"]),

  education: z.array(
    z.object({
      duration: z.object({
        from: z.string(),
        to: z.string(),
      }),
      subject: z.string(),
      courseTitle: z.string(),
      institution: z.string(),
      description: z.string().optional(),
    }),
  ),

  profileImage: z
    .object({
      url: z.string().optional(),
      public_id: z.string().optional(),
    })
    .optional(),

  resumeUrl: z.string().url().optional().or(z.string().length(0)),
});
