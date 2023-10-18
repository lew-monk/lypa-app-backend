import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../../controllers/exceptions/unauthorized";
import { TokenVerify } from "../lib/base-token-validation";

export class JwtHandler extends TokenVerify {
  public constructor() {
    super();
  }

  public generateToken(payload: any, expiresIn: number): string {
    const issuedAt = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const expiration = issuedAt + expiresIn; // Expiration timestamp

    const token = jwt.sign({ exp: expiration, iat: issuedAt, ...payload }, this._secretKey);

    return token;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw Error("Please Login to continue");
    }
    try {
      const decoded = jwt.verify(token, this._secretKey);
      req.body!.user = decoded;
      next();
    } catch (error: any) {
      // Token verification failed
      throw new UnauthorizedException("Please Log in again to access your account");
    }
  }
}
