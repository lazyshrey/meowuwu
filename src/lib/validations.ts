import { z } from "zod";

export const linkSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  url: z.string().url("Invalid URL").or(z.string().startsWith("https://").min(8)),
  isVisible: z.boolean().default(true),
  variant: z.enum(["primary", "secondary"]).default("primary"),
  clicks: z.number().int().nonnegative().default(0),
});

export const themeSchema = z.object({
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color hex"),
  buttonColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color hex"),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color hex"),
  font: z.enum(["Inter", "Outfit", "Poppins", "Geist", "Quicksand"]).optional().default("Inter"),
  socialPosition: z.enum(["top", "bottom"]).optional().default("top"),
});

export const socialsSchema = z.object({
  instagram: z.string().optional(),
  x: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  github: z.string().optional(),
  discord: z.string().optional(),
});

export const seoSchema = z.object({
  title: z.string().max(60, "Title is too long").optional(),
  description: z.string().max(160, "Description is too long").optional(),
});

export const userUpdateSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),
  bio: z.string().max(160, "Bio is too long").optional(),
  avatarUrl: z.string().url().optional().or(z.string().length(0)),
  links: z.array(linkSchema).max(10, "You can have a maximum of 10 links").optional(),
  theme: themeSchema.optional(),
  socials: socialsSchema.optional(),
  seo: seoSchema.optional(),
  showBranding: z.boolean().optional(),
});
