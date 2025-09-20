import createHttpError from "http-errors";
import type { RequestHandler } from "express";
import { MarkAsReadDTO, NotificationSubscribeDTO, PushNotificationDTO } from "../dtos/notification.dtos";
import NotificationRepository from "../repositories/notification.repository";
import { FirebaseNotification } from "../../../libs/firebase/utils";
import { NOTIFICATION } from "../../../models/notification.model";

class NotificationController {
   constructor(private notificationRepository: NotificationRepository) {}

   subscribe: RequestHandler = async (req, res, next) => {
      try {
         const body: NotificationSubscribeDTO = req.body;
         if (!body || !body.deviceToken) {
            return next(createHttpError.BadRequest("Device token is required"));
         }
         await this.notificationRepository.saveDeviceToken(req.user.id, body.deviceToken);
         res.status(201).json({
            message: "Notification subscribed!",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   pushNotification: RequestHandler = async (req, res, next) => {
      try {
         const body: PushNotificationDTO = req.body;
         
         if (!body.ids || !body.title || !body.body || !body.priority || !body.type) {
            return next(createHttpError.BadRequest("Notification must include ids, title, body,type, priority fields"));
         }

         if (!body.ids || !Array.isArray(body.ids) || !body.ids?.length) {
            return next(createHttpError.BadRequest("ids must be array"));
         }

         if (!Object.values(NOTIFICATION.TYPE).includes(body.type)) {
            return next(createHttpError.BadRequest(`Invalid notification type must be ${Object.keys(NOTIFICATION.TYPE).join(" , ")}`));
         }

         if (!Object.values(NOTIFICATION.PRIORITY).includes(body.priority)) {
            return next(createHttpError.BadRequest(`Invalid notification priority ${Object.keys(NOTIFICATION.PRIORITY).join(" , ")}`));
         }

         await new FirebaseNotification({
            title: body.title,
            body: body.body,
            priority: body.priority,
            type: body.type,
         }).send(body.ids);

         res.status(201).json({
            message: "Notification sent!",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   getNotifications: RequestHandler = async (req, res, next) => {
      try {
         const result = await this.notificationRepository.notificationsByUserId(req.user.id);
         res.status(201).json({
            message: "Notification subscribed!",
            data: { notifications: result },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   markAsRead: RequestHandler = async (req, res, next) => {
      try {
         const body: MarkAsReadDTO = req.body;
         if (!body) {
            return next(createHttpError.BadRequest("Invalid request body."));
         }

         if (!Array.isArray(body.ids)) {
            return next(createHttpError.BadRequest("'ids' must be an array."));
         }

         if (!body.ids?.length) {
            return next(createHttpError.BadRequest("Missing notification IDs."));
         }
         const result = await this.notificationRepository.markAsReadById({
            ids: body.ids,
            userId: req.user?.id,
         });
         if (!result.length) {
            return next(createHttpError.BadRequest("Unread notification not found or already read"));
         }
         res.status(201).json({
            message: "Notification marked as read successfully!",
            data: { notifications: result },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };
}
export default new NotificationController(
   new NotificationRepository() //
);
