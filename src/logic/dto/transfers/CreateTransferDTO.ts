import { ValidationException } from "../../../controllers/exceptions/validation-exception";

export class CreateTransferDTO {
  public constructor(
    public readonly amount: number,
    public readonly senderID: number,
    public readonly recipient_email: string
  ) {}

  public static fromRequest(body: any): CreateTransferDTO {
    if (!body.recipient_email) {
      throw new ValidationException("Please provide the recipient email");
    }
    if (!body.amount) {
      throw new ValidationException("Please provide the amount to deposit");
    }
    if (!body.user) {
      throw new ValidationException("Access Token is required");
    }

    return new CreateTransferDTO(body.amount, body.user.id, body.recipient_email);
  }
}
