import createHttpError from "http-errors";
import { InviteUserDTO } from "../dtos/invite-user.dto";
import User, { IUserModel } from "../model/user.model";
import { UserActivationDTO } from "../dtos/user-activation.dto";

export default class UserRepository {
   geAllUsers = async () => {
      try {
         const data = await User.find({ role: "USER" });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   findUserByEmail = async (email: string) => {
      try {
         const data = await User.findOne({ field: "email", value: email });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   findUserByID = async (id: string) => {
      try {
         const data = await User.findOneById(id);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   inviteUser = async (user: InviteUserDTO) => {
      try {
         const data = await User.create({
            ...user,
            isActive: false,
            role: "USER",
         } as IUserModel);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   deleteUser = async (id: string) => {
      try {
         const data = await User.deleteOne(id);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   changeUserStatusByID = async ({ userId, status }: UserActivationDTO) => {
      try {
         const data = await User.updateOne(userId, {
            isActive: status === "true",
         });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   updateUserProfile = async (id: string, profile: IUserModel["profile"]) => {
      try {
         const data = await User.updateOne(id, { profile });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   updatePassword = async (id: string, password: string) => {
      try {
         const data = await User.updateOne(id, { password });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };
}
