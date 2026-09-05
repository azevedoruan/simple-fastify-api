import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// Create the table of our BD Postgres
export const users = pgTable(
    "Users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull(),
        email: text("email").notNull().unique(),
        passwordHash: text("password_hash").notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow()
    }
)

// DTOs.
// Create our objects to represent the tables in runtime.
export type Users = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert