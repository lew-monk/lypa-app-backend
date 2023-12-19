import { desc, eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DBServiceImpl } from "../db";
import { NewWalletTransaction, WalletTransaction, mpesaStatusEnum, users, walletTransaction } from "../schema";

@injectable()
export class TransferRepository {
  public constructor(private readonly _dbService: DBServiceImpl) {}

  public async getTransfers(): Promise<WalletTransaction[]> {
    const transfers = await this._dbService._db.select().from(walletTransaction);
    return transfers;
  }

  public async createTransfer(data: NewWalletTransaction): Promise<{ id: number }> {
    const transfers = await this._dbService._db
      .insert(walletTransaction)
      .values(data)
      .returning({ id: walletTransaction.id });
    return transfers[0];
  }

  public async updateTransferStatusWithId(
    id: number,
    statusState: number
  ): Promise<
    { updatedId: number; amount: number; recipient_walletId: number; sender_walletId: number; status: string | null }[]
  > {
    const transfers = await this._dbService._db
      .update(walletTransaction)
      .set({ status: mpesaStatusEnum.enumValues[statusState], updatedAt: new Date() })
      .where(eq(walletTransaction.id, id))
      .returning({
        updatedId: walletTransaction.id,
        amount: walletTransaction.amount,
        recipient_walletId: walletTransaction.walletId_to,
        sender_walletId: walletTransaction.walletId_from,
        status: walletTransaction.status,
      });
    return transfers;
  }

  public async getTransferById(id: number): Promise<WalletTransaction> {
    const transfer = await this._dbService._db.select().from(walletTransaction).where(eq(walletTransaction.id, id));
    return transfer[0];
  }

  public async getUserTransfers(userId: number, size: number, page: number): Promise<any[]> {
    const transfers = await this._dbService._db
      .select({
        id: walletTransaction.id,
        amount: walletTransaction.amount,
        status: walletTransaction.status,
        updatedAt: walletTransaction.updatedAt,
        recipient: users.email,
      })
      .from(walletTransaction)
      .rightJoin(users, eq(walletTransaction.walletId_to, users.id))
      .limit(size)
      .where(eq(walletTransaction.walletId_from, userId))
      .orderBy(desc(walletTransaction.updatedAt))
      .offset((page - 1) * size);
    return transfers;
  }
}