import { IUserInputs } from "@dapi-co/dapi-node/lib/types/models/IUserInputs";
import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class TransferDTO {
  public constructor(
    public readonly accessCode: string,
    public readonly userSecret: string,
    public readonly amount: string,
    public readonly accountID: string,
    public readonly userID: string,
    public readonly operationID: string,
    public readonly userInputs: IUserInputs
  ) {}

  public static fromRequest(body: any): TransferDTO {
    if (!body.accessCode) {
      throw new ValidationException("Login in to your bank account to continue");
    }
    if (!body.userSecret) {
      throw new ValidationException("Login in to your bank account to continue");
    }
    if (!body.amount) {
      throw new ValidationException("Please provide the amount to deposit");
    }
    if (!body.accountID) {
      throw new ValidationException("Provide an account to deposit from");
    }

    if (!body.user) {
      throw new ValidationException("Access Token is required");
    }

    return new TransferDTO(
      body.accessCode,
      body.userSecret,
      body.amount,
      body.accountID,
      body.user.id,
      body.operationID,
      body.userInputs
    );
  }
}
