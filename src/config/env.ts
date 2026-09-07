import { z } from 'zod'

const envSchema = z.object({
    DB_PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string()
})

export const env = envSchema.parse(process.env)