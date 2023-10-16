import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MpesaService } from "../../logic/mpesa/mpesa";
import { BaseHttpResponse } from "../lib/base-hhtp-response";

@controller("/mpesa")
export class MpesaController {
  private constructor(private readonly mpesaService: MpesaService) {}

  @httpGet("/")
  //@ts-ignore
  private async index(req: Request, res: Response): Promise<void> {
    const mpesaTransactions = await this.mpesaService.getMpesaTransactions();
    res
      .status(200)
      .json(BaseHttpResponse.success({ student: mpesaTransactions }, 200));
  }
}
