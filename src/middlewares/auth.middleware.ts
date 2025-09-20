import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "../libs/jwt";
import { IUserModel } from "../models/user.model";

type AuthType = (requiredRoles: IUserModel["role"][]) => RequestHandler;
export const Auth: AuthType = (requiredRoles) => async (req, res, next) => {
   try {
      const accessToken = req?.cookies?.accessToken || req.headers["authorization"]?.split("Bearer ")[1] || req.headers["authorization"]?.split("bearer ")[1];

      if (!accessToken) {
         return next(createHttpError.Unauthorized("You are unauthorized"));
      }

      const user = await jwt.verifyToken(accessToken);
      req.user = user;
      if (!requiredRoles.includes(user.role)) {
         return next(createHttpError.Forbidden("You do not have permission"));
      }
      if (!user.isActive) {
         return next(createHttpError.Forbidden("Your account is inactive. Please contact support."));
      }
      next();
   } catch (error: any) {
      if (error.name === "TokenExpiredError") {
         return next(createHttpError.Unauthorized("Token has expired. Please login again."));
      }
      if (error.name === "JsonWebTokenError") {
         return next(createHttpError.Unauthorized("Invalid authentication token."));
      }
      next(createHttpError.InternalServerError());
   }
};
