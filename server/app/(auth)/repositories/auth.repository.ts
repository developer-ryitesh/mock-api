import createHttpError from "http-errors";
import User, { IUserModel } from "../../(user)/model/user.model";
import { FieldValue } from "firebase-admin/firestore";
import { RegisterDTO } from "../dtos/register.dto";

export default class AuthRepository {
   findByUserId = async (id: string) => {
      try {
         const data = await User.findOneById(id);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   findByUserEmail = async (email: string) => {
      try {
         const data = await User.findOne({ field: "email", value: email });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   createUser = async (user: Omit<RegisterDTO, "confirmPassword">) => {
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

   createResetTokenByUserID = async (arg: { userID: string; token: string }) => {
      try {
         const data = await User.updateOne(arg.userID, {
            resetToken: arg.token,
            resetTokenExpDate: new Date(Date.now() + 2 * 60 * 1000) as any, // 2 mins expiry
         });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   verifyResetToken = async (arg: { token: string }) => {
      try {
         const data = await User.query([
            { field: "resetToken", operator: "==", value: arg.token },
            { field: "resetTokenExpDate", operator: ">=", value: new Date() },
         ]);

         return data?.[0] || null; // return first user or null
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   updatePasswordByUserId = async (args: { userId: string; hashPassword: string }) => {
      try {
         const data = await User.updateOne(args.userId, {
            password: args.hashPassword,
         });
         await User.updateOne(data.id, {
            resetToken: FieldValue.delete() as any,
            resetTokenExpDate: FieldValue.delete() as any,
         });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };
}
