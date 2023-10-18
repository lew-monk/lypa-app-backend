import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DBServiceImpl } from "../db";
import { NewTransaction, mpesaStatusEnum, mpesaTransaction } from "../schema";

@injectable()
export class MpesaRepository {
  public constructor(private readonly _dbService: DBServiceImpl) {}

  public async getMpesaTransactions(): Promise<any> {
    const transactions = await this._dbService._db.select().from(mpesaTransaction);
    return transactions;
  }
  public async createMpesaTransaction(data: NewTransaction): Promise<{ id: number }[]> {
    const transactions = await this._dbService._db
      .insert(mpesaTransaction)
      .values(data)
      .returning({ id: mpesaTransaction.id });
    return transactions;
  }

  public async updateMpesaTransactionStatusWithId(
    id: number,
    statusState: number
  ): Promise<{ updatedId: number; amount: number; msisdn: string }[]> {
    const transactions = await this._dbService._db
      .update(mpesaTransaction)
      .set({ status: mpesaStatusEnum.enumValues[statusState], updatedAt: new Date() })
      .where(eq(mpesaTransaction.id, id))
      .returning({ updatedId: mpesaTransaction.id, amount: mpesaTransaction.amount, msisdn: mpesaTransaction.msisdn });
    return transactions;
  }
}
