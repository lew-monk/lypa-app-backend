import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class GetProfileDTO {
  public constructor(public readonly email: string, public readonly msisdn: string, public readonly id: string) {}

  public static fromRequest(body: any): GetProfileDTO {
    if (!body.user) {
      throw new ValidationException("Access Token is required");
    }
    return new GetProfileDTO(body.user.email, body.user.msisdn, body.user.id);
  }
}
