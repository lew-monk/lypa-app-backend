import bcrypt from "bcrypt";

export class PasswordHandler {
  public async hashPassword(plaintextPassword: string): Promise<string> {
    return await bcrypt.hash(plaintextPassword, 10);
  }

  public async comparePassword(
    plaintextPassword: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hash);
  }
}
