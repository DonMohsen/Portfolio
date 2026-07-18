import { z } from "zod";

const projectTypeSchema = z.enum([
  "saas",
  "marketplace",
  "ai",
  "automation",
  "mobile",
  "other",
]);

const featureSchema = z.enum([
  "auth",
  "billing",
  "dashboard",
  "realtime",
  "ai",
  "admin",
  "i18n",
  "mobile",
]);

const timelineSchema = z.enum(["rush", "normal", "flexible"]);

export const estimateRequestSchema = z.object({
  projectType: projectTypeSchema,
  features: z.array(featureSchema).max(8),
  timeline: timelineSchema,
  locale: z.enum(["fa", "en"]),
});

export const toolLeadSchema = z.object({
  toolSlug: z.string().min(1).max(64),
  locale: z.enum(["fa", "en"]),
  email: z.string().email().max(320).optional(),
  inputs: z.record(z.string(), z.unknown()),
  result: z.record(z.string(), z.unknown()).optional(),
  source: z.string().min(1).max(120).optional(),
});

export type EstimateRequest = z.infer<typeof estimateRequestSchema>;
export type ToolLeadInput = z.infer<typeof toolLeadSchema>;
