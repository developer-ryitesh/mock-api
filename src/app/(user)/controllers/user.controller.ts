import createHttpError from "http-errors";
import { RequestHandler } from "express";
import UserRepository from "../repositories/user.repository";
import { ProfileDTO } from "../dtos/profile.dto";
import { compare, hash } from "bcrypt";

class UserController {
   constructor(private userRepository: UserRepository) {}

   updateProfile: RequestHandler = async (req, res, next) => {
      try {
         const body: ProfileDTO = req.body;
         const result = await this.userRepository.updateUserProfile(req?.user.id, {
            fullName: body?.fullName || "",
            bio: body.bio || "",
         });
         res.status(201).json({
            message: "Profile successfully updated!",
            data: { result },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   session: RequestHandler = async (req, res, next) => {
      try {
         const { password, ...user } = req?.user;
         res.status(200).json({
            message: "profile successfully created!",
            data: {
               user,
            },
            success: true,
         });
      } catch (error) {
         next(createHttpError.InternalServerError());
      }
   };

   updatePassword: RequestHandler = async (req, res, next) => {
      try {
         const body = req.body;
         if (!body || !body.oldPassword || !body.newPassword) {
            return next(createHttpError.BadRequest("oldPassword , newPassword is required"));
         }
         if (body.oldPassword === body.newPassword) {
            return next(createHttpError.BadRequest("New password cannot be the same as old password"));
         }
         const isMatch = await compare(body.oldPassword, req.user.password);
         if (!isMatch) {
            return next(createHttpError.BadRequest("Old password is incorrect"));
         }
         const hashedNewPassword = await hash(body.newPassword, 10);
         await this.userRepository.updatePassword(req.user.id, hashedNewPassword);
         res.status(201).json({
            message: "password success updated!",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };
}

export default new UserController(
   new UserRepository() //
);
