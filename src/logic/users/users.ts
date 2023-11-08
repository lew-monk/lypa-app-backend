import { injectable } from "inversify";
import { UnauthorizedException } from "../../controllers/exceptions/unauthorized";
import { ValidationException } from "../../controllers/exceptions/validation-exception";
import { User } from "../../data/schema";
import { UserRepository } from "../../data/users/user.repository";
import { WalletRepository } from "../../data/wallet/wallet.repository";
import { UserSignUpDTO } from "../dto/user/signup";
import { PasswordHandler } from "../utils/password_handler";

@injectable()
export class UserService {
  public constructor(private readonly userRepo: UserRepository, private readonly walletRepo: WalletRepository) {}

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
  public async deleteUserById(id: number) {
    const user = await this.userRepo.deleteById(id);
    return user;
  }
  public async updateUserById(id: number, updateData: any) {
    const user = await this.userRepo.updateWithId(id, updateData);
    return user;
  }
  public async createUser(user: UserSignUpDTO) {
    let check = await this.userRepo.findByEmail(user.email);
    if (!check) throw new ValidationException("User already exists");

    const password = await new PasswordHandler().hashPassword(user.password);

    user.setHashedPassword = password;

    const newUser = await this.userRepo.createUser(user);

    await this.walletRepo.createWallet({
      userId: newUser[0].insertedId,
      balance: 0,
    });
    return newUser;
  }

  public async getUserProfile(email: string, msisdn: string, userId: number) {
    console.log(email, msisdn, userId);
    const wallet = await this.walletRepo.getWalletByUserId(userId);
    const transactions = await this.userRepo.getUserTransactions(msisdn);
    return { wallet: wallet[0], transactions };
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException("User does not exist");

    const passwordHandler = new PasswordHandler();

    const checkPassword = await passwordHandler.comparePassword(password, user.password);

    if (!checkPassword) throw new UnauthorizedException("Email or password is incorrect");

    return user;
  }
}
