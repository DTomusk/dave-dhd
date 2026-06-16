import z from "zod";

export const brainDumpSchema = z.object({
    content: z.string()
        .min(1, "Content is required")
        .max(1000, "Content must be less than 1000 characters"),
});

export type BrainDumpSchema = z.infer<typeof brainDumpSchema>;