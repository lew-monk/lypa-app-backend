import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { injectable } from "inversify";
import postgres from "postgres";

@injectable()
abstract class DBService {
  //@ts-ignore
  public _db: PostgresJsDatabase;
  public abstract connect(): Promise<void>;
}

export class DBServiceImpl extends DBService {
  public async connect(): Promise<void> {
    const sql = postgres(
      `psql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`,
      { max: 1 }
    );
    this._db = drizzle(sql);
    // await migrate(this._db, { migrationsFolder: "drizzle" });
  }
}
