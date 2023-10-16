CREATE TABLE IF NOT EXISTS "mpesa_transactions" (
	"id" serial NOT NULL,
	"msisdn" text NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
