/**
 * Lipa na Mpesa STK Push(Online Payment API)
 * @name LipaNaMpesaOnlinePayment
 * @description Use this API to initiate online payment on behalf of a customer.
 * @param {string} callBackUrl - The url to which the M-Pesa response will be sent.
 * @param {string} accountRef - Alpha numeric account reference. Id's used to identify the transaction. Generrated by the system
 * @param {string} amount - The amount to be paid.
 * @param {string} phoneNumber - The phone number of the customer.
 * @param {string} transactionDesc - The description of the transaction. This is any additional information/comment that can be sent along with the request from your system.
 * @param {string} transactionType - This is the transaction type that is used to identify the transaction when sending the request to M-Pesa.
 * @param {string} businessShortCode - This is organizations shortcode (Paybill or Buygoods - A 5 to 7 digit account number) used to identify an organization and receive the transaction.
 * @param {string} password - This is the passkey that is used to generate the encrypted password.
 * @param {string} timestamp - This is the Timestamp of the transaction, normaly in the formart of YEAR+MONTH+DATE+HOUR+MINUTE+SECOND (YYYYMMDDHHMMSS) Each part should be atleast two digits apart from the year which takes four digits.
 * @param {string} partyA - This is the phone number of the customer.
 * @param {string} partyB - This is the organization shortcode (Paybill or Buygoods - A 5 to 7 digit account number) used to identify an organization and receive the transaction.
 *
 */

async function LipaNaMpesa(
  senderMsisdn: number,
  amount: number,
  callBackUrl: string,
  accountRef: string,
  transactionType: string,
  shortCode = null,
  transactionDesc = "Okay",
  passKey = null
) {
  //@ts-ignore Ob
  const _shortCode = shortCode || this.configs.lipaNaMpesaShortCode;

  //@ts-ignore
  const _passKey = passKey || this.configs.lipaNaMpesaShortPass;
  const timeStamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);

  const password = Buffer.from(`${_shortCode}${_passKey}${timeStamp}`).toString(
    "base64"
  );

  //@ts-ignore
  const req = await this.request();
  return req.post("/mpesa/stkpush/v1/processrequest", {
    BusinessShortCode: _shortCode,
    Password: password,
    Timestamp: timeStamp,
    TransactionType: transactionType,
    Amount: amount,
    PartyA: senderMsisdn,
    PartyB: _shortCode,
    PhoneNumber: senderMsisdn,
    CallBackURL: callBackUrl,
    AccountReference: accountRef,
    TransactionDesc: transactionDesc,
  });
}

export default LipaNaMpesa;
