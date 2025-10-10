import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(50),
  type: z.enum(["expense", "income"]),
});

export type CategorySchemaDTO = z.infer<typeof categorySchema>;
