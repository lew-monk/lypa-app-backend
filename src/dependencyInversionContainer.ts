import { Container } from "inversify";

import { DBServiceImpl } from "./data/db";
import { MpesaRepository } from "./data/mpesa/mpesa.repository";
import { TransferRepository } from "./data/transfers/transfers.repository";
import { UserRepository } from "./data/users/user.repository";
import { WalletRepository } from "./data/wallet/wallet.repository";
import { DapiService } from "./logic/dapi/dapi";
import { MpesaService } from "./logic/mpesa/mpesa";
import { TransferService } from "./logic/transfers/transfers";
import { UserService } from "./logic/users/users";
import { WalletService } from "./logic/wallet/wallet.services";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(DBServiceImpl).toSelf();
container.bind(MpesaService).toSelf();
container.bind(MpesaRepository).toSelf();
container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();
container.bind(WalletService).toSelf();
container.bind(WalletRepository).toSelf();
container.bind(DapiService).toSelf();
container.bind(TransferService).toSelf();
container.bind(TransferRepository).toSelf();
