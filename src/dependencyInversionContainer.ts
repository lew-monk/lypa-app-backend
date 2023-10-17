import { Container } from "inversify";
import { DBServiceImpl } from "./data/db";
import { MpesaRepository } from "./data/mpesa/mpesa.repository";
import { UserRepository } from "./data/users/user.repository";
import { MpesaService } from "./logic/mpesa/mpesa";
import { UserService } from "./logic/users/users";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(DBServiceImpl).toSelf();
container.bind(MpesaService).toSelf();
container.bind(MpesaRepository).toSelf();
container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();
