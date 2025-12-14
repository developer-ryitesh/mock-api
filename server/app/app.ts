import express from "express";
import AppModule from "./app.module";
import createHttpError from "http-errors";
import globalError from "../middlewares/error.middleware";
import cookieParser from "cookie-parser";
import view from "../middlewares/view.middleware";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // parse form bodies
app.use("/api/v1", AppModule());
app.use(view());

// Error handler
app.use(async (req, res, next) => next(createHttpError.NotFound()));
app.use(globalError);

export default app;
