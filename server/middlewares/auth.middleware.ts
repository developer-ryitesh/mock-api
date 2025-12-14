import type { RequestHandler } from "express";
import createHttpError from "http-errors";

type Role = "ADMIN" | "USER";
type AuthHandler = (requiredRoles: Role[]) => RequestHandler;

import JWT from "../libs/jwt";
import UserRepository from "../app/(user)/repositories/user.repository";

class Auth {
   constructor(private _auth: UserRepository, private _jwt: JWT) {}

   authorize: AuthHandler = (requiredRoles) => async (req, res, next) => {
      try {
         const accessToken =
            req?.cookies?.accessToken || //
            req.headers["authorization"]?.split("Bearer ")[1] ||
            req.headers["authorization"]?.split("bearer ")[1];

         if (!accessToken) {
            return next(createHttpError.Unauthorized("You are unauthorized"));
         }

         const verify = await this._jwt.verifyToken(accessToken);

         const user = await this._auth.findUserByID(verify.id);
         if (!user) {
            return next(createHttpError.Unauthorized("User not found"));
         }
         if (!requiredRoles.includes(user?.role as Role)) {
            return next(createHttpError.Forbidden("You do not have permission"));
         }
         if (!user.isActive) {
            return next(createHttpError.Forbidden("Your account is inactive. Please contact support."));
         }

         req.user = user;
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
}

export const auth = new Auth(new UserRepository(), new JWT());
