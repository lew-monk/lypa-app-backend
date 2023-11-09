export interface ClassConstructor {
  consumerKey: string;
  consumerSecret: string;
  environment?: string;
  shortCode?: string;
  initiatorName?: string;
  lipaNaMpesaShortCode?: Number;
  lipaNaMpesaShortPass?: string;
  securityCredential?: string;
  certPath?: string;
}

export interface LipaNaMpesaOnlineModel {
  senderMsisdn: number;
  amount: number;
  callBackUrl: string;
  accountRef: string;
  transactionDesc: string;
}
