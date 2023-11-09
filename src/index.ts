import "dotenv/config";
import "reflect-metadata";

import { App } from "./web/application";
import "./web/bank/controller";
import "./web/mpesa/controller";
import "./web/users/controller";

export async function bootstrap(): Promise<void> {
  new App().setup();
}

bootstrap();
