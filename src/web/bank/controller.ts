import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import path from "path";
import { DapiService } from "../../logic/dapi/dapi";
import { GetBankAccountDTO } from "../../logic/dto/bank/GetBankAccountsDTO";
import { ExchangeTokenDTO } from "../../logic/dto/bank/exhangeTokenDTO";
import { JwtHandler } from "../../logic/utils/token_handler";
import { BaseHttpResponse } from "../lib/base-hhtp-response";
import { ValidateRequest } from "../middleware/validate-request";

@controller("/bank")
export class BankController {
  public constructor(private readonly bankService: DapiService) {}

  @httpGet("/")
  public async index(req: Request, res: Response) {
    res.status(200).json(BaseHttpResponse.success({ message: "identity" }));
  }

  @httpPost("/exchange-token", new JwtHandler().verifyToken, ValidateRequest.with(ExchangeTokenDTO))
  public async exchangeToken(req: Request, res: Response) {
    let accessCode = await this.bankService.exchangeToken(req.body.accessCode, req.body.connectionID);
    res.status(200).json(BaseHttpResponse.success({ permanentAccessToken: accessCode }));
  }

  @httpGet("/login-two")
  public async logon(req: Request, res: Response) {
    res.sendFile("main.html", { root: path.join(__dirname, "/src/views/") });
  }

  @httpPost("/get-bank-accounts", new JwtHandler().verifyToken, ValidateRequest.with(GetBankAccountDTO))
  public async getBankAccounts(req: Request, res: Response) {
    console.log(req.body);
    const accounts = await this.bankService.getAccounts(
      req.body.accessCode,
      req.body.userSecret,
      req.body.operationID,
      req.body.userInputs
    );
    res.status(200).json(BaseHttpResponse.success({ accounts }));
  }
}
