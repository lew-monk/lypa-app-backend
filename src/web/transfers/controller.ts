import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CreateTransferDTO } from "../../logic/dto/transfers/CreateTransferDTO";
import { updateTransferDTO } from "../../logic/dto/transfers/UpdateTransferDTO";
import { TransferService } from "../../logic/transfers/transfers";
import { JwtHandler } from "../../logic/utils/token_handler";
import { BaseHttpResponse } from "../lib/base-hhtp-response";
import { ValidateRequest } from "../middleware/validate-request";

@controller("/transfers")
export class TransferController {
  public constructor(private readonly transferService: TransferService) {}

  @httpGet("/")
  public async index(req: Request, res: Response) {
    const transfers = await this.transferService.getTransfers();
    res.status(200).json(BaseHttpResponse.success({ transfers }, 200));
  }

  @httpGet("/user/:userId", new JwtHandler().verifyToken)
  public async getUserTransfers(req: Request, res: Response) {
    const transfers = await this.transferService.getUserTransfers(
      parseInt(req.params.userId),
      parseInt(req.params.size),
      parseInt(req.params.page)
    );
    res.status(200).json(BaseHttpResponse.success({ transfers }, 200));
  }

  @httpPost("/create", new JwtHandler().verifyToken, ValidateRequest.with(CreateTransferDTO))
  public async createTransfer(req: Request, res: Response) {
    const transfer = await this.transferService.createTransfer(req.body);
    res.status(200).json(BaseHttpResponse.success({ transfer }, 200));
  }

  @httpPost("/update-status", ValidateRequest.with(updateTransferDTO))
  public async updateTransferStatus(req: Request, res: Response) {
    const transfer = await this.transferService.updateTransferStatusWithId(req.body.id, req.body.status);
    res.status(200).json(BaseHttpResponse.success({ ...transfer }, 200));
  }
}
