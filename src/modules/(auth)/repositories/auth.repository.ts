import type HttpClient from "@/libs/interceptors";
import type { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO, RegisterDTO } from "../dtos/auth.dto";

export default class AuthRepository {
   constructor(private _http: HttpClient) {}

   login = async (body: LoginDTO) => {
      return await this._http.public.post("/auth/login", body);
   };

   register = async (body: RegisterDTO) => {
      return await this._http.public.post("/auth/register", body);
   };

   forgotPassword = async (body: ForgotPasswordDTO) => {
      return await this._http.public.post("/auth/forgot-password", body);
   };

   resetPassword = async (body: ResetPasswordDTO) => {
      return await this._http.public.post("/auth/reset-password", body);
   };
}
