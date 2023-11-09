import { ValidationException } from "../../../controllers/exceptions/validation-exception";
import { insertUserSchema } from "../../../data/users/user.repository";

export class UserSignUpDTO {
  constructor(
    public readonly msisdn: string,
    public readonly email: string,
    public password: string
  ) {}

  public static fromRequest(body: any): UserSignUpDTO {
    if (!body.msisdn) {
      throw new ValidationException("Phonenumber is required");
    }
    if (!body.email) {
      throw new ValidationException("Email is required");
    }
    if (!body.password) {
      throw new ValidationException("Password is required");
    }

    insertUserSchema.parse(body);

    return new UserSignUpDTO(body.msisdn, body.email, body.password);
  }

  public set setHashedPassword(password: string) {
    this.password = password;
  }
}
