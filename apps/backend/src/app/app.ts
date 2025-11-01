import express from "express";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import appModule from "./app.module";
import cors from "cors";
import corsConfig from "../libs/cors";
import globalError from "../middlewares/error.middleware";
import { swaggerSetup } from "../libs/swagger";
import path from "path";
import fs from "fs";
import ConnectFrontend from "../libs/connect-frontend";

const app = express();
/* --middlewares-- */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
swaggerSetup(app);
app.use("/api/v1", appModule());

ConnectFrontend(app);

app.use(async (req, res, next) => next(createHttpError.NotFound()));
app.use(globalError);

export default app;
