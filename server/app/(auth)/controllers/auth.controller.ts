import { RequestHandler } from "express";
import { resetPasswordSchema } from "../dtos/reset-password.dtos";
import { validate } from "../../../libs/zod";
import { loginSchema } from "../dtos/login.dto";
import AuthService from "../services/auth.service";
import HttpCookie from "../../../libs/http-cookie";
import { registerSchema } from "../dtos/register.dto";
import { forgotPasswordSchema } from "../dtos/forgot-password.dto";
import AuthRepository from "../repositories/auth.repository";
import JWT from "../../../libs/jwt";
import Mail from "../../../libs/mail";

class AuthController {
   constructor(private _service: AuthService, private _cookie: HttpCookie, private _mail: Mail) {}

   // ---- login ----
   login: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(loginSchema, req.body);
         const result = await this._service.login(body);
         this._cookie.setCookie({ key: "refreshToken", value: result.refreshToken })(res);
         res.status(200).json({
            message: "login successfully",
            data: { accessToken: result.accessToken },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // --- register ----
   register: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(registerSchema, req.body);
         await this._service.register(body);
         res.status(201).json({
            message: "Register successfully",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // --- refreshToken ---
   refreshToken: RequestHandler = async (req, res, next) => {
      try {
         const refreshToken = req.cookies?.refreshToken;
         const result = await this._service.refreshToken(refreshToken);

         res.status(200).json({
            message: "Token refreshed successfully",
            data: {
               accessToken: result.accessToken,
            },
            success: true,
         });
      } catch (error: any) {
         next(error);
      }
   };

   // ----- forgot passowd -----
   forgotPassword: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(forgotPasswordSchema, req.body);
         const result = await this._service.forgotPassword(body.email);

         try {
            await this._mail.send({
               to: result.email,
               subject: "Forgot Password",
               template: "forgot-password.mail",
               data: {
                  fullName: result.data?.fullName,
                  otp: result.data?.otp,
                  seconds: result.data?.seconds,
               },
            });
         } catch (error) {
            console.log(error);
         }
         res.status(201).json({
            message: "Otp send your email successfully",
            data: { seconds: result.data.seconds },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // ----- reset passowd -----
   resetPassword: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(resetPasswordSchema, req.body);
         await this._service.resetPassword({
            otp: body.otp,
            newPassword: body.newPassword,
         });
         res.status(200).json({
            success: true,
            data: {},
            message: "you are password successfully reset",
         });
      } catch (error) {
         next(error);
      }
   };
}
export default new AuthController(
   new AuthService(
      new AuthRepository(), //
      new JWT()
   ),
   new HttpCookie(),
   new Mail()
);
