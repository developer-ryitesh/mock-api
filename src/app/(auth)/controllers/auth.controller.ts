import createHttpError from "http-errors";
import { RequestHandler } from "express";
import AuthRepository from "../repositories/auth.repository";
import { ForgotPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from "../dtos/auth.dtos";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "../../../libs/jwt";
import { SendEmail } from "../../../libs/mail/utils";
import crypto from "crypto";

class AuthController {
   constructor(private authRepository: AuthRepository) {}

   // ---- login ----
   login: RequestHandler = async (req, res, next) => {
      try {
         const body: LoginDTO = req.body;
         if (!body || !body.email || !body.password) {
            throw new createHttpError.BadRequest();
         }
         const result = await this.authRepository.findByUserEmail(body.email);
         if (!result) {
            return next(createHttpError.NotFound("User not found"));
         }
         const match = await compare(body.password, result.password);
         if (!match) {
            return next(createHttpError.Unauthorized());
         }
         if (!result.isActive) {
            return next(createHttpError.Forbidden("Your account is inactive. Please contact support."));
         }
         const accessToken = jwt.createAccessToken({ id: result.id });
         const refreshToken = jwt.createRefreshToken({ id: result.id });
         jwt.setCookie("refreshToken", refreshToken)(res);
         res.status(200).json({
            message: "login successfully",
            data: { accessToken },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // --- register ----
   register: RequestHandler = async (req, res, next) => {
      try {
         const body: RegisterDTO = req.body;
         if (!body.email || !body.password || !body.confirmPassword) {
            return next(createHttpError.BadRequest("email , password , confirmPassword required"));
         }
         if (body.password !== body.confirmPassword) {
            return next(createHttpError.BadRequest("password and confirm password in match!"));
         }
         const user = await this.authRepository.findByUserEmail(body.email);
         if (user) {
            return next(createHttpError.BadRequest());
         }
         const salt = await genSalt();
         const hashedPassword = await hash(body.password, salt);
         await this.authRepository.createUser({
            email: body.email,
            password: hashedPassword,
         });
         res.status(201).json({
            message: "Register successfully",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // --- logout ---
   logout: RequestHandler = async (req, res, next) => {
      try {
         jwt.deleteCookie("refreshToken")(res);
         res.status(200).json({
            message: "logout successfully",
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
         if (!refreshToken) {
            return next(createHttpError.NotFound("Refresh token not found"));
         }
         const user = await jwt.verifyToken(refreshToken);
         if (!user) {
            return next(createHttpError.NotFound("User not found"));
         }
         const accessToken = jwt.createAccessToken({ id: user.id });
         const newRefreshToken = jwt.createRefreshToken({ id: user.id });
         jwt.setCookie("refreshToken", newRefreshToken)(res);

         res.status(200).json({
            message: "Token refreshed successfully",
            data: { accessToken },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // ----- forgot passowd -----
   forgotPassword: RequestHandler = async (req, res, next) => {
      try {
         const body: ForgotPasswordDTO = req.body;
         if (!body || !body.email) {
            return next(createHttpError.BadRequest("Request body is empty or 'email' field is missing"));
         }
         const user = await this.authRepository.findByUserEmail(body.email);
         if (!user) {
            return next(createHttpError.NotFound("User not found"));
         }
         const otp = String(Math.floor(100000 + Math.random() * 900000));

         const result = await this.authRepository.createResetTokenByUserID({
            userID: user.id,
            token: crypto.createHash("sha256").update(String(otp)).digest("hex"),
         });

         const data = {
            fullName: user.profile?.fullName || "User",
            otp: otp,
            otpExpiresIn: result.resetTokenExpDate,
         };
         await SendEmail({
            to: user.email,
            subject: "Forgot Password",
            template:{
               name:"forgot-password.mail",
               context:data,
            },
         });
         res.status(201).json({
            message: "Otp send your email successfully",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // ----- reset passowd -----
   resetPassword: RequestHandler = async (req, res, next) => {
      try {
         const body: ResetPasswordDTO = req.body;
         if (!body || !body.otp || !body.newPassword || !body.confirmPassword) {
            return next(createHttpError.BadRequest("Request body is empty or 'otp , newPassword ,confirmPassword' field is missing"));
         }
         if (body.newPassword !== body.confirmPassword) {
            return next(createHttpError.BadRequest("Password not matching"));
         }
         const convertOpt2Token = crypto.createHash("sha256").update(String(body.otp)).digest("hex");

         const tokenUser = await this.authRepository.verifyResetToken({
            token: convertOpt2Token,
         });
         if (!tokenUser) {
            return next(createHttpError.BadRequest("Invalid otp or expired!"));
         }
         const salt = await genSalt();
         const hashedPassword = await hash(body.newPassword, salt);
         const result = await this.authRepository.updatePasswordByUserId({
            userId: tokenUser.id,
            hashPassword: hashedPassword,
         });
         res.status(200).json({
            success: true,
            data:{},
            message: "you are password successfully reset",
         });
      } catch (error) {
         next(error);
      }
   };
}
export default new AuthController(new AuthRepository());
