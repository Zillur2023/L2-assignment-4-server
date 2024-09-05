import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import cookieParser from "cookie-parser";
import config from "./app/config";
import path from "path";

const app: Application = express();
app.use(express.static(path.join(__dirname, "public")));
//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: [config.client_url as string], credentials: true }));

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hi Next Level Developer !");
});

app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

export default app;
