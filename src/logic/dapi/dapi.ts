import DapiApp from "@dapi-co/dapi-node";
import { injectable } from "inversify";
import { ValidationException } from "../../controllers/exceptions/validation-exception";

const dapi = new DapiApp({
  appSecret: process.env.DAPI_APP_SECRET!,
});

@injectable()
export class DapiService {
  public constructor(
    private readonly _accessToken: string = process.env.DAPI_TOKEN!,
    private readonly _userSecret: string = process.env.DAPI_USER_SECRET!
  ) {}

  public async getIdentity() {
    const { status, code, success, operationID, identity, msg } = await dapi.data.getIdentity(
      this._accessToken,
      this._userSecret
    );
    if (status === "done") {
      return identity;
    }
    if (status === "failed") {
      throw new ValidationException(msg!);
    }

    if (status === "user_input_required") {
      throw new ValidationException("Pending");
    }
  }
}
