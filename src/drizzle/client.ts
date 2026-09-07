import postgres from 'postgres'
import { env } from "../config/env.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import { users } from './schema/users.js';

export const pg = postgres(env.DATABASE_URL)

export const db = drizzle(pg, {
    schema: {
        users
    }
})