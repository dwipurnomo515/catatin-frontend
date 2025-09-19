import { z } from "zod";

export const transactionSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(3).max(50),
  amount: z.union([z.string(), z.number()]),
  type: z.enum(["income", "expense"]),
  category_id: z.number(),
  date: z.string(),
});

export type TransactionSchemaDTO = z.infer<typeof transactionSchema>;
