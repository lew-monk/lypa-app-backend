import DapiApp from "@dapi-co/dapi-node";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const dapiSecret = process.env.DAPI_SECRET_KEY;

console.log(dapiSecret);
const dapi = new DapiApp({
  appSecret: dapiSecret!,
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/dapi", async (req, res) => {
  try {
    const dapiResponse = await dapi.handleSDKDapiRequests(
      req.body,
      req.headers
    );
    res.send(dapiResponse);
  } catch (error) {
    //Handle Network Errors
    console.dir(error);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
