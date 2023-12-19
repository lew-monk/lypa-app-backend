import { IUserInputs } from "@dapi-co/dapi-node/lib/types/models/IUserInputs";
import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class GetBankAccountDTO {
  public constructor(
    public readonly accessCode: string,
    public readonly userSecret: string,
    public readonly operationID: string,
    public readonly userInputs: IUserInputs
  ) {}

  public static fromRequest(body: any): GetBankAccountDTO {
    if (!body.accessCode) {
      throw new ValidationException("Login in to your bank account to continue");
    }
    if (!body.userSecret) {
      throw new ValidationException("Login in to your bank account to continue");
    }

    if (!body.user) {
      throw new ValidationException("Access Token is required");
    }

    return new GetBankAccountDTO(body.accessCode, body.userSecret, body.operationID, body.userInputs);
  }
}
