import type HttpClient from "@/libs/interceptors";
import type { InviteUserDTO, UpdatePasswordDTO, UpdateProfileDTO, UserStatusDTO } from "../dtos/user.dto";

export default class UserRepository {
   constructor(private _http: HttpClient) {}

   getSession = async () => {
      return await this._http.private.get("/user/session");
   };

   updateProfile = async (body: UpdateProfileDTO) => {
      return await this._http.private.put("/user/update-profile", body);
   };

   updatePassword = async (body: UpdatePasswordDTO) => {
      return await this._http.private.put("/user/update-password", body);
   };

   userLogout = async () => {
      return await this._http.private.get("/user/logout");
   };

   inviteUser = async (body: InviteUserDTO) => {
      return await this._http.private.post("/user/invite", body);
   };

   getUsers = async () => {
      return await this._http.private.get("/user/all");
   };

   getUserById = async (userId: string) => {
      return await this._http.private.get(`/user/${userId}`);
   };

   changeUserStatus = async (body: UserStatusDTO) => {
      return await this._http.private.post("/user/activation", body);
   };

   deleteUserById = async (userId: string) => {
      return await this._http.private.delete(`/user/delete/${userId}`);
   };

   dashboard = async () => {
      return await this._http.private.get(`/user/dashboard`);
   };
}
