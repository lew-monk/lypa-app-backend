import request from "../../utils/requests";
import LipaNaMpesa from "./STKPush";
import getAuth from "./auth";
import { ClassConstructor } from "./models";

class Mpesa {
  public configs: ClassConstructor;
  request: any;
  baseUrl: string;

  constructor(config: ClassConstructor) {
    if (config.consumerKey === "") throw new Error("Consumer Key is Missing");
    if (config.consumerSecret === "")
      throw new Error("Consumer Secret is Missing");

    this.configs = { ...config };
    this.request = request.bind(this);
    this.baseUrl = `${process.env.MPESA_ENDPOINT}`;
  }

  getClassData() {
    return this.configs;
  }

  authorization() {
    return getAuth.bind(this)(
      this.configs.consumerKey,
      this.configs.consumerSecret
    );
  }
  lipaNaMpesaOnline() {
    //@ts-ignore ae
    return LipaNaMpesa.bind(this)(...arguments);
  }
}

export default Mpesa;
