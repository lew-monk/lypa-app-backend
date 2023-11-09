import axios from "axios";

const getAuth = async (consumerKey: string, consumerSecret: string) => {
  const authCode = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  return await axios.get(`${process.env.MPESA_AUTH_ENDPOINT}`, {
    headers: {
      Authorization: `Basic ${authCode}`,
      "Content-Type": "application/json",
    },
  });
};

export default getAuth;
