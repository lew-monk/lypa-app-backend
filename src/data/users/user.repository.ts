import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { injectable } from "inversify";
import { DBServiceImpl } from "../db";
import { MpesaTransaction, NewUser, User, mpesaTransaction, users } from "../schema";
import { UserRepositoryAbstract } from "./abstract";

const phoneRegex = new RegExp(/^(254|0)[0-9]{9}$/);

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email("Invalid email"),
  msisdn: (schema) => schema.msisdn.regex(phoneRegex, "Invalid phone number. Use format 254xxxxxxxxx"),
});
@injectable()
export class UserRepository implements UserRepositoryAbstract {
  public constructor(private readonly _dbService: DBServiceImpl) {}

  public async findAll(): Promise<User[]> {
    const profiles = await this._dbService._db.select().from(users);
    return profiles;
  }
  public async findByEmail(email: string): Promise<User> {
    const profile = await this._dbService._db.select().from(users).where(eq(users.email, email));
    return profile[0];
  }
  public async findById(id: number): Promise<User> {
    const profile = await this._dbService._db.select().from(users).where(eq(users.id, id));
    return profile[0];
  }
  public async deleteById(id: number): Promise<unknown> {
    const profile = await this._dbService._db.delete(users).where(eq(users.id, id));
    return profile;
  }
  public async updateWithId(id: number, updateData: any): Promise<any> {
    const profile = await this._dbService._db
      .update(users)
      .set({ ...updateData })
      .where(eq(users.id, id))
      .returning({ updatedId: users.id });
    return profile;
  }

  public async getUserTransactions(msisdn: string): Promise<MpesaTransaction[]> {
    const transactions = await this._dbService._db
      .select()
      .from(mpesaTransaction)
      .where(eq(mpesaTransaction.msisdn, msisdn))
      .limit(5);
    return transactions;
  }

  public async createUser(user: NewUser): Promise<any> {
    const profile = await this._dbService._db.insert(users).values(user).returning({ insertedId: users.id });
    return profile;
  }
}
