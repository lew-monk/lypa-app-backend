/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import DapiApp from "@dapi-co/dapi-node";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { https } from "firebase-functions";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const dapi = new DapiApp({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appSecret: "d679d8a89a29c92ca3b585f61d8bf1d1c0286bc07a71ab6b1f5dc4ac926698bb",
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
    console.dir(error);
  }
});

exports.app = https.onRequest(app);
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
