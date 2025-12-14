import createHttpError from "http-errors";
import { UpdatePasswordDTO } from "../dtos/update-password.dto";
import { compare, genSalt, hash } from "bcrypt";
import UserRepository from "../repositories/user.repository";
import { ProfileDTO } from "../dtos/update-profile.dto";
import { UserActivationDTO } from "../dtos/user-activation.dto";

export default class UserService {
   constructor(private _repo: UserRepository) {}

   geAllUsers = async () => {
      const users = await this._repo.geAllUsers();
      return users;
   };

   geUserById = async (id: string) => {
      const user = await this._repo.findUserByID(id);
      if (!user) {
         throw createHttpError.NotFound("User not found!");
      }
      return { user };
   };

   inviteUser = async (body: any) => {
      const user = await this._repo.findUserByEmail(body.email);
      if (user) {
         throw createHttpError.BadRequest("User already exists");
      }
      const salt = await genSalt();
      const hashedPassword = await hash(body.password, salt);
      const result = await this._repo.inviteUser({
         email: body.email,
         password: hashedPassword,
      });
      return result;
   };

   deleteUser = async (id: string) => {
      const user = await this._repo.findUserByID(id);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const data = await this._repo.deleteUser(id);
      return { id: data.id };
   };

   userActivation = async (body: UserActivationDTO) => {
      const user = await this._repo.findUserByID(body.userId);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const updateUser = await this._repo.changeUserStatusByID({
         userId: user.id,
         status: body.status,
      });
      return updateUser;
   };

   updatePassword = async (body: UpdatePasswordDTO & { userID: string }) => {
      const user = await this._repo.findUserByID(body?.userID);
      const isMatch = await compare(body.oldPassword, user?.password as string);
      if (!isMatch) {
         throw createHttpError.BadRequest("Old password is incorrect");
      }
      const hashedNewPassword = await hash(body.newPassword, 10);
      await this._repo.updatePassword(body.userID, hashedNewPassword);
   };

   updateProfile = async (body: ProfileDTO & { userId: string }) => {
      const result = await this._repo.updateUserProfile(body.userId, {
         fullName: `${body?.name} ${body?.lastname}`,
         bio: body.bio || "",
      });
      return result;
   };
}
