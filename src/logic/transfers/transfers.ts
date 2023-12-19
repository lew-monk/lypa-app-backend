import { injectable } from "inversify";
import { ValidationException } from "../../controllers/exceptions/validation-exception";
import { WalletTransaction } from "../../data/schema";
import { TransferRepository } from "../../data/transfers/transfers.repository";
import { UserService } from "../users/users";
import { WalletService } from "../wallet/wallet.services";

@injectable()
export class TransferService {
  public constructor(
    private readonly transferRepo: TransferRepository,
    private readonly userService: UserService,
    private readonly walletService: WalletService
  ) {}

  public async getTransfers(): Promise<WalletTransaction[]> {
    const transfers = await this.transferRepo.getTransfers();
    return transfers;
  }

  public async createTransfer(data: any): Promise<number> {
    const recipient = await this.userService.getUserByEmail(data.recipient_email);

    const recipient_wallet = await this.userService.getUserWalletByID(recipient.id);

    if (recipient_wallet === undefined) throw new ValidationException("Recipient does not have a wallet");

    const sender_wallet = await this.walletService.getWalletByUserId(data.senderID);

    if (sender_wallet[0].balance < data.amount) throw new ValidationException("Insufficient funds");

    const transferDetails = {
      walletId_from: sender_wallet[0].id,
      walletId_to: recipient_wallet.wallet!.id,
      amount: parseInt(data.amount),
    };

    const transfers = await this.transferRepo.createTransfer(transferDetails);
    return transfers.id;
  }

  public async getUserTransfers(userId: number, size: number, page: number): Promise<WalletTransaction[]> {
    const transfers = await this.transferRepo.getUserTransfers(userId, size, page);
    return transfers;
  }

  public async updateTransferStatusWithId(id: number, statusState: number): Promise<any> {
    const transfers = await this.transferRepo.updateTransferStatusWithId(id, statusState);

    //Update various wallet balances

    //Update sender wallet balance
    const sender_wallet = await this.walletService.getWalletById(transfers[0].sender_walletId);
    const sender_wallet_balance = sender_wallet[0].balance - transfers[0].amount;

    if (sender_wallet_balance < 0) throw new ValidationException("Insufficient funds");

    await this.walletService.updateWalletById(transfers[0].sender_walletId, { balance: sender_wallet_balance });

    //Update recipient wallet balance
    const recipient_wallet = await this.walletService.getWalletById(transfers[0].recipient_walletId);
    const recipient_wallet_balance = recipient_wallet[0].balance + transfers[0].amount;

    await this.walletService.updateWalletById(transfers[0].recipient_walletId, { balance: recipient_wallet_balance });

    return transfers;
  }
}
