import { injectable } from "inversify";
import { User } from "../../data/schema";
import { UserRepository } from "../../data/users/user.repository";

@injectable()
export class UserService {
  public constructor(private readonly userRepo: UserRepository) {}

  public async getUsers(): Promise<User[] | []> {
    const users = await this.userRepo.findAll();
    return users;
  }
  public async getUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    return user;
  }
  public async getUserById(id: number) {
    const user = await this.userRepo.findById(id);
    return user;
  }
}
