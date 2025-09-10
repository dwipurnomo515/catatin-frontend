import {z} from 'zod'

export const transactionSchema = z.object({
    description: z.string().min(3).max(50),
    amount: z.number(),
    type: z.enum(['income', 'expense']),
    category: z.string().min(3).max(50),
    date: z.string()
})

export type TransactionSchemaDTO = z.infer<typeof transactionSchema>