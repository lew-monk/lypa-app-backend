import { injectable } from "inversify";
import { MpesaRepository } from "../../data/mpesa/mpesa.repository";

@injectable()
abstract class MpesaServiceAbstract {
  public abstract getMpesaTransactions(): Promise<any>;
}

@injectable()
export class MpesaService extends MpesaServiceAbstract {
  public constructor(private readonly mpesaRepo: MpesaRepository) {
    super();
  }

  public async getMpesaTransactions() {
    const transactions = await this.mpesaRepo.getMpesaTransactions();
    return transactions;
  }
}
