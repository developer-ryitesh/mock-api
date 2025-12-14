import createHttpError from "http-errors";
import { RequestHandler } from "express";
import UserRepository from "../repositories/user.repository";
import { validate } from "../../../libs/zod";
import { updatePasswordSchema } from "../dtos/update-password.dto";
import UserService from "../services/user.service";
import { profileSchema } from "../dtos/update-profile.dto";
import HttpCookie from "../../../libs/http-cookie";
import { userByIdSchema } from "../dtos/user-by-id.dto";
import { inviteUserSchema } from "../dtos/invite-user.dto";
import { deleteUserSchema } from "../dtos/delete-user.dto";
import { userActivationSchema } from "../dtos/user-activation.dto";
import Mail from "../../../libs/mail";

class UserController {
   constructor(private _service: UserService, private _httpCookie: HttpCookie, private _mail: Mail) {}

   geAllUsers: RequestHandler = async (req, res, next) => {
      try {
         const users = await this._service.geAllUsers();
         res.status(200).json({
            success: true,
            data: { users },
            message: "Users fetch!",
         });
      } catch (error) {
         next(error);
      }
   };

   geUserById: RequestHandler = async (req, res, next) => {
      try {
         const params = validate(userByIdSchema, req.params);
         const result = await this._service.geUserById(params?.id);
         res.status(200).json({
            success: true,
            data: result.user,
            message: "Users fetch!",
         });
      } catch (error) {
         next(error);
      }
   };

   inviteUser: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(inviteUserSchema, req.body);
         const result = await this._service.inviteUser(body);
         try {
            await this._mail.send({
               to: [body.email],
               subject: "Welcome Mail",
               template: "welcome.mail",
               data: {
                  email: body.email,
                  password: body.password,
                  action: `http://localhost:3000/auth/login`,
                  fullname: result.profile?.fullName || "User",
               },
            });
         } catch (error) {
            console.log(error);
         }
         res.status(200).json({
            success: true,
            data: {},
            message: `Invitation sent to ${result.email} successfully!`,
         });
      } catch (error) {
         next(error);
      }
   };

   deleteUser: RequestHandler = async (req, res, next) => {
      try {
         const params = validate(deleteUserSchema, req.params);
         const result = await this._service.deleteUser(params.id);
         res.status(200).json({
            success: true,
            data: { id: result.id },
            message: `User delete successfully!`,
         });
      } catch (error) {
         next(error);
      }
   };

   userActivation: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(userActivationSchema, req?.body);
         const user = await this._service.userActivation({
            userId: body.userId,
            status: body.status,
         });
         try {
            await this._mail.send({
               to: [user.email],
               subject: "User Account Activation",
               template: "account-status.mail",
               data: {
                  name: user.profile?.fullName || "User", // user's name
                  email: user.email, // user's email
                  isActive: user?.isActive, // boolean: account active or not
                  login: "https://yourdomain.com/login", // login link
               },
            });
         } catch (error) {
            console.log(error);
         }
         res.status(200).json({
            success: true,
            data: user,
            message: `User (${user.email}) is ${user?.isActive ? "Enable" : "Disable"}!`,
         });
      } catch (error) {
         next(error);
      }
   };
   // --- updateProfile ---
   updateProfile: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(profileSchema, req.body);
         const { password, ...user } = req.user;
         await this._service.updateProfile({
            userId: req?.user.id,
            ...body,
         });
         res.status(201).json({
            message: "Profile successfully updated!",
            data: user,
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   // --- session ---
   session: RequestHandler = async (req, res, next) => {
      try {
         const { password, ...user } = req?.user;
         res.status(200).json({
            message: "profile successfully created!",
            data: user,
            success: true,
         });
      } catch (error) {
         next(createHttpError.InternalServerError());
      }
   };

   // --- update password ---
   updatePassword: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(updatePasswordSchema, req.body);
         await this._service.updatePassword({ ...body, userID: req.user.id });
         res.status(201).json({
            message: "password success updated!",
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
         this._httpCookie.deleteCookie({ key: "refreshToken" })(res);
         res.status(200).json({
            message: "logout successfully",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };
}

export default new UserController(new UserService(new UserRepository()), new HttpCookie(), new Mail());
