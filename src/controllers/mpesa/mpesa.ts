import Mpesa from ".";

const transaction = new Mpesa({
  consumerKey: `${process.env.CONSUMER_KEY}`,
  consumerSecret: `${process.env.CONSUMER_SECRET}`,
  lipaNaMpesaShortCode: parseInt(`${process.env.LIPA_NA_MPESA_SHORT_CODE}`),
  lipaNaMpesaShortPass: `${process.env.LIPA_NA_MPESA_PASS_KEY}`,
});

export default transaction;
