import type { Config } from "drizzle-kit";

export default {
  schema: "./src/data/schema.ts",
  out: "./drizzle",
} satisfies Config;
