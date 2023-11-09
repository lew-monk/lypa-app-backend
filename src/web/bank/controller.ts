import { controller, httpGet } from "inversify-express-utils";
import { DapiService } from "../../logic/dapi/dapi";
import { BaseHttpResponse } from "../lib/base-hhtp-response";

@controller("/bank")
export class BankController {
  public constructor(private readonly bankService: DapiService) {}
  @httpGet("/")
  //@ts-ignore
  public async index(res: Response) {
    let identity = await this.bankService.getIdentity();
    //@ts-ignore
    res.status(200).json(BaseHttpResponse.success({ message: identity }));
  }
}
