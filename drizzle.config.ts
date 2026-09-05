import type { Config } from 'drizzle-kit'
import { env } from './src/config/env.js'

export default {
    schema: "./src/drizzle/schema", // Indicate where our tables will be located
    out: "./src/drizzle/migrations", // Indicate where our migrations SQL will be created
    dialect: "postgresql",
    dbCredentials: {
        url: env.POSTGRES_URL
    }
} satisfies Config