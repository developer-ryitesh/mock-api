import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { genSalt, hash } from "bcrypt";
import AdminUserRepository from "../repositories/admin-user.repository";
import { ChangeUserStatusDTO, InviteUserDTO, STATUS } from "../dtos/admin-user.dtos";
import { SendEmail } from "../../../libs/mail/utils";
import CONFIG from "../../../config";

class AdminUsersController {
   constructor(private adminUserRepository: AdminUserRepository) { }

   geAllUsers: RequestHandler = async (req, res, next) => {
      try {
         const users = await this.adminUserRepository.geAllUsers();
         res.status(200).json({
            success: true,
            data: { users },
            message: "Users fetch!",
         });
      } catch (error) {
         next(error);
      }
   };

   inviteUser: RequestHandler = async (req, res, next) => {
      try {
         const body: InviteUserDTO = req.body;
         if (!body?.password || !body.email) {
            return next(createHttpError.BadRequest("Password and email are required"));
         }
         const user = await this.adminUserRepository.findUserByEmail(body.email);
         if (user) {
            return next(createHttpError.BadRequest("User already exists"));
         }
         const salt = await genSalt();
         const hashedPassword = await hash(body.password, salt);
         const result = await this.adminUserRepository.inviteUser({
            email: body.email,
            password: hashedPassword,
         });

         if (result.id) {
            const data = {
               email: body.email,
               password: body.password,
               login_link: `${CONFIG.HAS_PROD ? CONFIG.SERVER_URL : CONFIG.DEV_URL}/auth/login`
            }
            await SendEmail({
               to: body.email,
               subject: "welcome mail",
               template: { name: "welcome.mail", context: data }
            })
         }
         res.status(200).json({
            success: true,
            data: {},
            message: `Invitation sent to ${body.email} successfully!`,
         });
      } catch (error) {
         next(error);
      }
   };

   deleteUser: RequestHandler = async (req, res, next) => {
      try {
         const id = req?.params?.id;
         if (!id) {
            return next(createHttpError.NotFound("[id] is required"));
         }
         const user = await this.adminUserRepository.findUserByID(id);
         if (!user) {
            return next(createHttpError.NotFound("User not found"));
         }
         const data = await this.adminUserRepository.deleteUser(id);
         res.status(200).json({
            success: true,
            data: { id: data.id },
            message: `User delete successfully!`,
         });
      } catch (error) {
         next(error);
      }
   };

   userStatus: RequestHandler = async (req, res, next) => {
      try {
         const body: ChangeUserStatusDTO = req?.body;
         if (!body || !body?.status || !body?.id) {
            return next(createHttpError.NotFound("[id , status] is required"));
         }
         if (!Object.keys(STATUS).includes(body?.status)) {
            return next(createHttpError.NotFound("Status 'true' or 'false'"));
         }
         const user = await this.adminUserRepository.findUserByID(body.id);
         if (!user) {
            return next(createHttpError.NotFound("User not found"));
         }
         const updateUser = await this.adminUserRepository.changeUserStatusByID({
            id: user.id,
            status: body.status,
         });
         if (updateUser) {
            const data = {
               name: updateUser.profile?.fullName || "User",
               email: updateUser.email,
               isActive: updateUser.isActive,
               login: "https://yourdomain.com/login"
            };
            await SendEmail({
               to: updateUser.email, //
               subject: "Account Status",
               template: { name: "account-status.mail", context: data }
            })
         }
         res.status(200).json({
            success: true,
            data: {},
            message: `User (${user.email}) is ${updateUser?.isActive ? "Enable" : "Disable"}!`,
         });
      } catch (error) {
         next(error);
      }
   };
}
export default new AdminUsersController(
   new AdminUserRepository() //
);
