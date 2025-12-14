import { NextFunction, Request, Response } from "express";

interface IError extends Error {
   status?: number;
}

const globalError = (err: IError, req: Request, res: Response, next: NextFunction) => {
   const statusCode = err.status || 500;
   const message = err.message || "Internal Server Error";

   res.status(statusCode).json({
      success: false,
      error: {
         status: statusCode,
         message,
      },
   });
};

export default globalError;
