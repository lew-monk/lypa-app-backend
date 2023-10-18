import { injectable } from "inversify";
import { User } from "../schema";

@injectable()
export abstract class UserRepositoryAbstract {
  public abstract findAll(): Promise<User[] | []>;
  public abstract findByEmail(email: string): Promise<User[]>;
  public abstract findById(id: number): Promise<User[]>;
  public abstract deleteById(id: number): Promise<unknown>;
  public abstract updateWithId(id: number, data: any): Promise<any>;
}
