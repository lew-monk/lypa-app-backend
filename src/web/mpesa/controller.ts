import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { MpesaService } from "../../logic/mpesa/mpesa";
import { JwtHandler } from "../../logic/utils/token_handler";
import { BaseHttpResponse } from "../lib/base-hhtp-response";

@controller("/mpesa")
export class MpesaController {
  private constructor(private readonly mpesaService: MpesaService) {}

  @httpGet("/")
  //@ts-ignore
  private async index(req: Request, res: Response): Promise<void> {
    const mpesaTransactions = await this.mpesaService.getMpesaTransactions();
    res.status(200).json(BaseHttpResponse.success({ transactions: mpesaTransactions }, 200));
  }
  @httpPost("/confirmation/:transactionId/:userId")
  //@ts-ignore
  private async callBack(req: Request, res: Response) {
    let { transactionId, userId } = req.params;
    let { ResultCode } = req.body.Body.stkCallback;
    let successState: number = 2;
    if (ResultCode === 0) {
      successState = 0;
    } else {
      successState = 1;
    }
    try {
      await this.mpesaService.confirmPayment(parseInt(transactionId), successState, parseInt(userId));
      res.status(200).json(BaseHttpResponse.success({ message: "success" }, 200));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @httpPost("/stk", new JwtHandler().verifyToken)
  //@ts-ignore
  private async stk(req: Request, res: Response): Promise<void> {
    try {
      let config = await this.mpesaService.sendSTK(req.body.user.msisdn, req.body.amount, req.body.user.id);
      res.status(200).json(BaseHttpResponse.success({ config }, 200));
    } catch (error: any) {
      res.status(200).json(BaseHttpResponse.failed(error.message, 200));
    }
  }
}
