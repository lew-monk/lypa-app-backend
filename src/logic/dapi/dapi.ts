import DapiApp from "@dapi-co/dapi-node";
import { IAccount } from "@dapi-co/dapi-node/lib/types/models/Account";
import { IUserInput, IUserInputs } from "@dapi-co/dapi-node/lib/types/models/IUserInputs";
import { IGetAccountsResponse } from "@dapi-co/dapi-node/lib/types/response/getAccounts";
import { injectable } from "inversify";
import { ValidationException } from "../../controllers/exceptions/validation-exception";

const dapi = new DapiApp({
  appSecret: process.env.DAPI_APP_SECRET!,
});

export interface IMyAccounts {
  accounts?: IAccount[];
  operationID: string | undefined;
  status: string;
  success: boolean;
  code?: number;
  msg: string;
  type?: string;
  usersInputs?: IUserInput[];
}

@injectable()
export class DapiService {
  // public constructor(
  //   private readonly _accessToken: string = process.env.DAPI_TOKEN!,
  //   private readonly _userSecret: string = process.env.DAPI_USER_SECRET!
  // ) {}

  // public async getIdentity() {
  //   const { status, identity, msg } = await dapi.data.getIdentity();
  //   if (status === "done") {
  //     return identity;
  //   } else if (status === "failed") {
  //     throw new ValidationException(msg!);
  //   } else throw new ValidationException("Pending");
  // }

  public async exchangeToken(accessCode: string, connectionID: string): Promise<string> {
    const { accessToken, status, msg } = await dapi.auth.exchangeToken(accessCode, connectionID);
    if (accessToken) return accessToken;
    else if (status === "failed") {
      throw new ValidationException(msg!);
    } else throw new ValidationException("Pending");
  }
  public async getAccounts(
    accessCode: string,
    userSecret: string,
    operationID: string,
    userInputs: IUserInputs[]
  ): Promise<IGetAccountsResponse> {
    const acc = await dapi.data.getAccounts(accessCode, userSecret, operationID, userInputs);
    return acc;
  }
}
