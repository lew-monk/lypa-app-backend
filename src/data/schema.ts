import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const mpesaTransaction = pgTable("mpesa_transactions", {
  id: serial("id").notNull().primaryKey(),
  msisdn: text("msisdn").notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("user_profile", {
  id: serial("id").notNull(),
  email: varchar("msisdn").notNull(),
  msisdn: varchar("amount"),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type NewUser = typeof users.$inferInsert;

export type User = InferSelectModel<typeof users>;
