import { NextFunction, Request, Response } from "express";

export abstract class TokenVerify {
  public _secretKey = process.env.SECRET_KEY || "secret";
  protected constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  public abstract verifyToken(req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
