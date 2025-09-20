import createHttpError from "http-errors";
import User, { IUserModel } from "../../../models/user.model";


export default class UserRepository {
   findByUserId = async (credentials: { id: string }) => {
      try {
         const data = await User.findOneById(credentials.id);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   updateUserProfile = async (id: string, profile: IUserModel["profile"]) => {
      try {
         const data = await User.updateOne(id, { profile })
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   updatePassword = async (id: string, password: string) => {
      try {
         const data = await User.updateOne(id, { password })
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   saveDeviceToken= async (id: string, deviceToken: string)=>{
      try {
         const data = await User.updateOne(id, { deviceToken })
         return data;
      } catch (error) {
          throw new createHttpError.InternalServerError("InternalServerError");
      }
   }
}

