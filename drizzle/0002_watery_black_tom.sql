ALTER TABLE "wallet_transaction" RENAME COLUMN "wallet_id" TO "walletId_from";--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD COLUMN "walletId_to" integer NOT NULL;