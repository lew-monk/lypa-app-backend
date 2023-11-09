import { injectable } from "inversify";
import Mpesa from "../../controllers/mpesa";
import { MpesaRepository } from "../../data/mpesa/mpesa.repository";
import { WalletRepository } from "../../data/wallet/wallet.repository";

const newTrans = new Mpesa({
  consumerKey: `${process.env.CONSUMER_KEY}`,
  consumerSecret: `${process.env.CONSUMER_SECRET}`,
  lipaNaMpesaShortCode: parseInt(`${process.env.LIPA_NA_MPESA_SHORT_CODE}`),
  lipaNaMpesaShortPass: `${process.env.LIPA_NA_MPESA_PASS_KEY}`,
});

@injectable()
abstract class MpesaServiceAbstract {
  public abstract getMpesaTransactions(): Promise<any>;
}

@injectable()
export class MpesaService extends MpesaServiceAbstract {
  public constructor(private readonly mpesaRepo: MpesaRepository, private readonly walletRepo: WalletRepository) {
    super();
  }

  public async getMpesaTransactions() {
    const transactions = await this.mpesaRepo.getMpesaTransactions();
    return transactions;
  }
  public async sendSTK(msisdn: number, amount: number, userId: number) {
    try {
      let trans = await this.mpesaRepo.createMpesaTransaction({
        msisdn: msisdn.toString(),
        amount,
        status: "pending",
      });

      //prettier-ignore
      //@ts-ignore
      await newTrans.lipaNaMpesaOnline(msisdn, amount, `${process.env.LIPA_NA_MPESA_CALLBACK_URL}/${trans[0].id}/${userId}`, "CompanyXLTD", "CustomerPayBillOnline");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async confirmPayment(transactionId: number, statusState: number, userId: number) {
    try {
      let transaction = await this.mpesaRepo.updateMpesaTransactionStatusWithId(transactionId, statusState);
      if (statusState === 0) {
        await this.walletRepo.updateBalanceByUserId(userId, transaction[0].amount);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
