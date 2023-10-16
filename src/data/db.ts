import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
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
    const sql = postgres("psql://postgres:postgres@localhost:6000", { max: 1 });
    this._db = drizzle(sql);
    await migrate(this._db, { migrationsFolder: "drizzle" });
    console.log("DBService connect");
  }
}
