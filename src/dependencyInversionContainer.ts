import { Container } from "inversify";
import { DBServiceImpl } from "./data/db";
import { MpesaRepository } from "./data/mpesa/mpesa.repository";
import { MpesaService } from "./logic/mpesa/mpesa";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(DBServiceImpl).toSelf();
container.bind(MpesaService).toSelf();
container.bind(MpesaRepository).toSelf();
