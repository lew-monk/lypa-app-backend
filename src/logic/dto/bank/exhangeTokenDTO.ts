import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class ExchangeTokenDTO {
  public constructor(public readonly accessCode: string, public readonly connectionID: string) {}

  public static fromRequest(body: any): ExchangeTokenDTO {
    if (!body.accessCode) {
      throw new ValidationException("Login in to your bank account to continue");
    }
    if (!body.connectionID) {
      throw new ValidationException("Login in to your bank account to continue");
    }
    if (!body.user) {
      throw new ValidationException("Access Token is required");
    }
    return new ExchangeTokenDTO(body.accessCode, body.connectionID);
  }
}
