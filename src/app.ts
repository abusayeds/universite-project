import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorhendel from "./app/middlwares/globalErrorhandler";
import notFound from "./app/middlwares/RouteHandel";
import router from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("this is get data ");
});
app.use(globalErrorhendel);
app.use(notFound);

export default app;
