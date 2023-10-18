import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DBServiceImpl } from "../db";
import { Wallet, wallet } from "../schema";

@injectable()
export class WalletRepository {
  public constructor(private readonly _dbService: DBServiceImpl) {}

  public async getWalletByUserId(userId: number): Promise<Wallet[]> {
    return await this._dbService._db.select().from(wallet).where(eq(wallet.userId, userId));
  }

  public async getWalletById(id: number): Promise<Wallet[]> {
    return await this._dbService._db.select().from(wallet).where(eq(wallet.id, id));
  }

  public async updateWalletById(id: number, updateData: any): Promise<any> {
    return await this._dbService._db
      .update(wallet)
      .set({ ...updateData })
      .where(eq(wallet.id, id))
      .returning({ updatedId: wallet.id });
  }
  public async updateBalanceByUserId(userId: number, updateData: number): Promise<any> {
    return await this._dbService._db.transaction(async (trx) => {
      const walletBalance = await trx.select().from(wallet).where(eq(wallet.userId, userId));
      const newBalance = walletBalance[0].balance + updateData;

      await trx
        .update(wallet)
        .set({ balance: newBalance })
        .where(eq(wallet.userId, userId))
        .returning({ updatedId: wallet.id });
    });
  }

  public async createWallet(walletData: any): Promise<any> {
    return await this._dbService._db.insert(wallet).values(walletData).returning({ walletID: wallet.id });
  }
}
