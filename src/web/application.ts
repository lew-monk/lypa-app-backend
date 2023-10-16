import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { UnauthorizedException } from "../controllers/exceptions/unauthorized";
import { ValidationException } from "../controllers/exceptions/validation-exception";
import { DBServiceImpl } from "../data/db";
import { container } from "../dependencyInversionContainer";
import { BaseHttpResponse } from "./lib/base-hhtp-response";

export class App {
  public async setup(): Promise<void> {
    const _db = container.get(DBServiceImpl);

    _db.connect();

    const server = new InversifyExpressServer(container, null, {
      rootPath: "/api",
    });

    server.setErrorConfig((expressApp: any) => {
      expressApp.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
          if (err instanceof ValidationException) {
            const response = BaseHttpResponse.failed(err.message, 400);
            return res.status(response.statusCode).json(response);
          }
          if (err instanceof Error) {
            const response = BaseHttpResponse.failed(err.message, 500);
            return res.status(response.statusCode).json(response);
          }
          if (err instanceof UnauthorizedException) {
            const response = BaseHttpResponse.failed(err.message, 401);
            return res.status(response.statusCode).json(response);
          }

          return next();
        }
      );
    });

    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();

    app.listen(process.env.PORT, () => {
      console.log("Listening on port ==> ", process.env.PORT);
    });
  }
}
