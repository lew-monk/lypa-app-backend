import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "../lib/base-validation-middleware";

export class ValidateRequest extends BaseMiddleware {
  public constructor(
    public readonly _DtoClass: any,
    public _params: boolean = false
  ) {
    super();
  }

  public execute(req: Request, res: Response, next: NextFunction) {
    if (this._params) {
      req.body = { ...req.body, ...req.params };
    }
    req.body = this._DtoClass.fromRequest(req.body);
    next();
  }

  public static with(dto: any) {
    return new ValidateRequest(dto, true).execute;
  }

  public static withParams(dto: any) {
    return new ValidateRequest(dto, true).execute;
  }
}
