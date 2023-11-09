import { NextFunction, Request, Response } from "express";

export abstract class BaseMiddleware {
  protected constructor() {
    this.execute = this.execute.bind(this);
  }

  public abstract execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>;
}
