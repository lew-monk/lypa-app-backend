import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DBServiceImpl } from "../db";
import { NewUser, User, users } from "../schema";
import { UserRepositoryAbstract } from "./abstract";

@injectable()
export class UserRepository extends UserRepositoryAbstract {
  public constructor(private readonly _dbService: DBServiceImpl) {
    super();
  }

  public async findAll(): Promise<User[]> {
    const profiles = await this._dbService._db.select().from(users);
    return profiles;
  }
  public async findByEmail(email: string): Promise<User[]> {
    const profile = await this._dbService._db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return profile;
  }
  public async findById(id: number): Promise<User[]> {
    const profile = await this._dbService._db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return profile;
  }
  public async deleteById(id: number): Promise<unknown> {
    const profile = await this._dbService._db
      .delete(users)
      .where(eq(users.id, id));
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

  public async create(user: NewUser): Promise<any> {
    const profile = await this._dbService._db
      .insert(users)
      .values(user)
      .returning({ insertedId: users.id });
    return profile;
  }
}
