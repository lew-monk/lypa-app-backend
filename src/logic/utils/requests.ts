import axios from "axios";
async function request() {
  //@ts-ignore
  const credentials = await this.authorization();
  const instance = axios.create({
    //@ts-ignore
    baseURL: this.baseUrl,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${credentials.data.access_token}`,
      "Content-Type": "application/json",
    },
  });
  return instance;
}
export default request;
