import { WalletRepository } from "../../data/wallet/wallet.repository";

export class WalletService {
  public constructor(private _walletRepo: WalletRepository) {}

  async getWalletByUserId(userId: number) {
    const wallet = await this._walletRepo.getWalletByUserId(userId);
    return wallet;
  }
  async getWalletById(id: number) {
    const wallet = await this._walletRepo.getWalletById(id);
    return wallet;
  }
  async updateWalletById(id: number, updateData: any) {
    const wallet = await this._walletRepo.updateWalletById(id, updateData);
    return wallet;
  }
  async createWallet(walletData: any) {
    const wallet = await this._walletRepo.createWallet(walletData);
    return wallet;
  }
}
