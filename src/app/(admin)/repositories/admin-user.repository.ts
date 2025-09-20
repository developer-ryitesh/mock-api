import createHttpError from "http-errors";
import User, { IUserModel } from "../../../models/user.model";
import { ChangeUserStatusDTO, InviteUserDTO } from "../dtos/admin-user.dtos";

export default class AdminUserRepository {
   geAllUsers = async () => {
      try {
         const data = await User.find();
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

   changeUserStatusByID = async ({ id, status }: ChangeUserStatusDTO) => {
      try {
         const data = await User.updateOne(id, {
            isActive: status === "true",
         });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };
}
