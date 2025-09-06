import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4).max(100),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterSchemaDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email().min(4),
  password: z.string().min(6),
});

export type LoginSchemaDTO = z.infer<typeof loginSchema>;
