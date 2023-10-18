import { Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPatch, httpPost } from "inversify-express-utils";
import { LoginDTO } from "../../logic/dto/user/login.dto";
import { UserSignUpDTO } from "../../logic/dto/user/signup";
import { UserService } from "../../logic/users/users";
import { BaseHttpResponse } from "../lib/base-hhtp-response";
import { SessionManagement } from "../middleware/check-session-validity";
import { ValidateRequest } from "../middleware/validate-request";

@controller("/user")
export class UserController {
  public constructor(private readonly _userService: UserService) {}

  @httpGet("/")
  //@ts-ignore
  private async index(req: Request, res: Response) {
    const users = await this._userService.getUsers();
    res.status(200).json(BaseHttpResponse.success({ users }, 200));
  }

  @httpGet("/email/:email")
  //@ts-ignore
  private async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await this._userService.getUserByEmail(email);
    res.status(200).json(BaseHttpResponse.success({ user }, 200));
  }

  @httpGet("/id/:id")
  //@ts-ignore
  private async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this._userService.getUserById(Number(id));
    res.status(200).json(BaseHttpResponse.success({ user }, 200));
  }

  @httpDelete("/delete/:id")
  //@ts-ignore
  private async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this._userService.deleteUserById(Number(id));
    res.status(201).json(BaseHttpResponse.success({ user }, 201));
  }

  @httpPatch("/update/:id")
  //@ts-ignore
  private async updateUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this._userService.updateUserById(Number(id), req.body);
    res.status(201).json(BaseHttpResponse.success({ user }, 201));
  }

  @httpPost("/signup", ValidateRequest.with(UserSignUpDTO))
  //@ts-ignore
  private async createUser(req: Request, res: Response) {
    const user = await this._userService.createUser(req.body);
    res.status(201).json(BaseHttpResponse.success({ user }, 201));
  }

  @httpPost("/login", ValidateRequest.with(LoginDTO))
  //@ts-ignore
  private async login(req: Request, res: Response) {
    const { email: emailReq, password } = req.body;
    try {
      const { email, id, msisdn } = await this._userService.login(emailReq, password);
      const accessToken = new SessionManagement().generateToken({ id, email, msisdn }, 3600);

      res.status(200).json(BaseHttpResponse.success({ user: { email }, accessToken }, 200));
    } catch (error: any) {
      res.status(400).json(BaseHttpResponse.failed(error.message, 403));
    }
  }
}
