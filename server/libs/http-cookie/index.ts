import { Response } from "express";

type Param = {
   key: string;
   value?: string;
};

type HandlerType = (param: Param) => (res: Response) => void;

export default class HttpCookie {
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

   setCookie: HandlerType = ({key, value}) => (res) => {
      res.cookie(key, value, {
         expires: this.getExpiryDate(String(process.env.REFRESH_TOKEN_EXPIRES_IN)),
         httpOnly: true,
         sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // important
         secure: process.env.NODE_ENV !== "development", // true in production (HTTPS)
      });
   };

   deleteCookie: HandlerType = ({key}) => (res) => {
      res.clearCookie(key, {
         httpOnly: true,
         sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // important
         secure: process.env.NODE_ENV !== "development", // true in production (HTTPS)
      });
   };
}
