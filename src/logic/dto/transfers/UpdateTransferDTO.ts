import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class updateTransferDTO {
  public constructor(public readonly id: number, public readonly status: number) {}

  public static fromRequest(body: any): updateTransferDTO {
    if (!body.id) {
      throw new ValidationException("Please provide the transfer id");
    }
    if (!body.status) {
      throw new ValidationException("Please provide the user's action");
    }

    return new updateTransferDTO(body.id, body.status);
  }
}
