import createHttpError from "http-errors";
import { LoginDTO } from "../dtos/login.dto";
import AuthRepository from "../repositories/auth.repository";
import bcrypt, { genSalt, hash } from "bcrypt";
import { RegisterDTO } from "../dtos/register.dto";
import crypto from "crypto";
import { ResetPasswordDTO } from "../dtos/reset-password.dtos";
import JWT from "../../../libs/jwt";

export default class AuthService {
   constructor(private _repo: AuthRepository, private _jwt: JWT) {}

   login = async (body: LoginDTO) => {
      const user = await this._repo.findByUserEmail(body.email);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const match = await bcrypt.compare(body.password, user.password);
      if (!match) {
         throw createHttpError.Unauthorized();
      }
      const accessToken = this._jwt.createToken({
         data: { id: user.id },
         exp: String(process.env.ACCESS_TOKEN_EXPIRES_IN),
      });

      const refreshToken = this._jwt.createToken({
         data: { id: user.id },
         exp: String(process.env.REFRESH_TOKEN_EXPIRES_IN),
      });

      return { accessToken, refreshToken };
   };

   register = async (body: RegisterDTO) => {
      const user = await this._repo.findByUserEmail(body.email);
      if (user) {
         throw createHttpError.BadRequest("User already exists with this email");
      }
      const salt = await genSalt();
      const hashedPassword = await hash(body.password, salt);
      await this._repo.createUser({
         email: body.email,
         password: hashedPassword,
      });
   };

   refreshToken = async (refreshToken: string) => {
      if (!refreshToken) {
         throw createHttpError.NotFound("Refresh token not found");
      }
      const token = await this._jwt.verifyToken(refreshToken);
      const user = await this._repo.findByUserId(token.id);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }

      const accessToken = this._jwt.createToken({
         data: { id: user.id },
         exp: String(process.env.ACCESS_TOKEN_EXPIRES_IN),
      });
      return { accessToken };
   };

   forgotPassword = async (email: string) => {
      const user = await this._repo.findByUserEmail(email);
      if (!user) {
         return createHttpError.NotFound("User not found");
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const result = await this._repo.createResetTokenByUserID({
         userID: user.id,
         token: crypto.createHash("sha256").update(String(otp)).digest("hex"),
      });
      const expDate: any = result.resetTokenExpDate;
      const data = {
         fullName: user.profile?.fullName || "User",
         otp: otp,
         seconds: Math.floor((expDate?._seconds * 1000 + expDate?._nanoseconds / 1e6 - Date.now()) / 1000),
      };
      return { data: data, email: user.email };
   };

   resetPassword = async (body: ResetPasswordDTO) => {
      const convertOpt2Token = crypto.createHash("sha256").update(String(body.otp)).digest("hex");
      const tokenUser = await this._repo.verifyResetToken({
         token: convertOpt2Token,
      });

      if (!tokenUser) {
         throw createHttpError.BadRequest("Invalid otp or expired!");
      }
      const salt = await genSalt();
      const hashedPassword = await hash(body.newPassword, salt);
      await this._repo.updatePasswordByUserId({
         userId: tokenUser.id,
         hashPassword: hashedPassword,
      });
   };
}
