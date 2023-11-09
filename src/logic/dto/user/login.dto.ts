import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class LoginDTO {
  public constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  public static fromRequest(body: any): LoginDTO {
    if (!body.email) {
      throw new ValidationException("Email is required");
    }
    if (!body.password) {
      throw new ValidationException("Password is required");
    }
    return new LoginDTO(body.email, body.password);
  }
}
