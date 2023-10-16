import { injectable } from "inversify";
import { DBServiceImpl } from "../db";
import { mpesaTransaction } from "../schema";

@injectable()
export class MpesaRepository {
  public constructor(private readonly _dbService: DBServiceImpl) {}

  public async getMpesaTransactions(): Promise<any> {
    const transactions = await this._dbService._db
      .select()
      .from(mpesaTransaction);
    return transactions;
  }
}
