import createHttpError from "http-errors";
import { Response } from "express";
import * as jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user.model";
dotenv.config();

type TokenData = {
   id: string;
};

class JWT {
   private getExpiryDate = (duration: string): Date => {
      const [valueStr, unit] = duration.split("-");
      const value = Number(valueStr);
      if (isNaN(value)) throw new Error("Invalid duration value");
      const unitMs: Record<string, number> = {
         d: 24 * 60 * 60 * 1000,
         h: 60 * 60 * 1000,
         m: 60 * 1000,
         s: 1000,
      };
      const ms = unitMs[unit];
      if (!ms) throw new Error("Invalid duration unit. Use 'd', 'h', 'm', or 's'.");
      return new Date(Date.now() + value * ms);
   };

   private findByUserID = async (id: string) => {
      try {
         const data = await User.findOneById(id);
         return data;
      } catch (error) {
         return null;
      }
   };

   createAccessToken = (tokenData: TokenData) => {
      const [value, unit] = String(process.env.ACCESS_TOKEN_EXPIRES_IN)?.split("-");
      const token = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
         expiresIn: `${value}${unit}` as any,
      });
      return token;
   };
   createRefreshToken = (tokenData: TokenData) => {
      const expiresIn = String(process.env.REFRESH_TOKEN_EXPIRES_IN).replace("-", "");
      const token = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
         expiresIn: expiresIn as any,
      });
      return token;
   };

   verifyToken = async (token: string) => {
      try {
         const verifyUser: any = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY as string);
         const user = await this.findByUserID(verifyUser?.id);
         if (!user) {
            throw createHttpError.Unauthorized("User not found");
         }
         return user;
      } catch (error: any) {
         throw error;
      }
   };

   setCookie = (name: string, data: string) => (res: Response) => {
      res.cookie(name, data, {
         expires: this.getExpiryDate(String(process.env.REFRESH_TOKEN_EXPIRES_IN)),
         httpOnly: true,
         sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // important
         secure: process.env.NODE_ENV !== "development", // true in production (HTTPS)
      });
   };

   deleteCookie = (name: string) => (res: Response) => {
      res.clearCookie(name, {
         httpOnly: true,
         sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // important
         secure: process.env.NODE_ENV !== "development", // true in production (HTTPS)
      });
   };
}

const jwt = new JWT();
export default jwt;
