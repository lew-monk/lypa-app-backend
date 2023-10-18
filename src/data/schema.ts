import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const mpesaStatusEnum = pgEnum("status", ["completed", "cancelled", "pending"]);

export const mpesaTransaction = pgTable("mpesa_transactions", {
  id: serial("id").primaryKey(),
  msisdn: text("msisdn").notNull(),
  amount: integer("amount").notNull(),
  status: mpesaStatusEnum("status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("user_profile", {
  id: serial("id").primaryKey(),
  email: varchar("msisdn").notNull(),
  msisdn: varchar("amount"),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wallet = pgTable("wallet", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  balance: integer("balance").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  wallet: many(wallet),
  mpesaTransactions: many(mpesaTransaction),
}));

export const walletRelations = relations(wallet, ({ one }) => ({
  user: one(users),
}));

export const mpesaTransactionRelations = relations(mpesaTransaction, ({ one }) => ({
  user: one(users),
}));

export type MpesaTransaction = InferSelectModel<typeof mpesaTransaction>;

export type Wallet = InferSelectModel<typeof wallet>;

export type CreateWallet = typeof wallet.$inferInsert;

export type NewUser = typeof users.$inferInsert;

export type NewTransaction = typeof mpesaTransaction.$inferInsert;

export type User = InferSelectModel<typeof users>;
