import DapiApp from "@dapi-co/dapi-node";
import { IAccount } from "@dapi-co/dapi-node/lib/types/models/Account";
import { IUserInput, IUserInputs } from "@dapi-co/dapi-node/lib/types/models/IUserInputs";
import { ITransferAutoflow } from "@dapi-co/dapi-node/lib/types/request/createTransfer";
import { ICreateTransferResponse } from "@dapi-co/dapi-node/lib/types/response/createTransfer";
import { IGetAccountsResponse } from "@dapi-co/dapi-node/lib/types/response/getAccounts";
import { injectable } from "inversify";
import { ValidationException } from "../../controllers/exceptions/validation-exception";
import { WalletService } from "../wallet/wallet.services";

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
  public constructor(private readonly walletService: WalletService) {}

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

  public async transferFlow(
    accessCode: string,
    userSecret: string,
    operationID: string,
    accountID: string,
    amount: string,
    userInputs: IUserInputs[],
    userID: string
  ): Promise<ICreateTransferResponse> {
    const transferFlow: ITransferAutoflow = {
      amount: parseInt(amount),
      senderID: accountID,
      beneficiary: {
        name: process.env.DAPI_BENEFICIARY_NAME!,
        accountNumber: process.env.DAPI_BENEFICIARY_ACCOUNT_NUMBER!,
        iban: process.env.DAPI_BENEFICIARY_IBAN!,
        swiftCode: process.env.DAPI_BENEFICIARY_SWIFT_CODE!,
        country: process.env.DAPI_BENEFICIARY_COUNTRY!,
        branchAddress: process.env.DAPI_BENEFICIARY_BRANCH_ADDRESS!,
        branchName: process.env.DAPI_BENEFICIARY_BRANCH_NAME!,
      },
    };

    const acc = await dapi.payment.transferAutoFlow(transferFlow, accessCode, userSecret, operationID, userInputs);

    if (acc.success) {
      //Update sender wallet balance
      const recipient_wallet = await this.walletService.getWalletByUserId(parseInt(userID));
      const recipient_wallet_balance = recipient_wallet[0].balance + parseInt(amount);
      console.log(recipient_wallet_balance);
      await this.walletService.updateWalletById(recipient_wallet[0].id, { balance: recipient_wallet_balance });
    }

    return acc;
  }
}
