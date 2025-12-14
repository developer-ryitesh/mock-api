import type { RequestHandler } from "express";
import { sendNotificationSchema } from "../dtos/send-notification.dtos";
import NotificationRepository from "../repositories/notification.repository";
import NotificationService from "../services/notification.service";
import { validate } from "../../../libs/zod";
import { markAsReadSchema } from "../dtos/mark-as-read.dto";
import { notificationSubscribeSchema } from "../dtos/notification-subscribe.dto";
import { FCM } from "../../../libs/firebase";

class NotificationController {
   constructor(private _service: NotificationService) {}

   subscribe: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(notificationSubscribeSchema, req.body);
         await this._service.subscribe({ userId: req.user.id, deviceToken: body?.deviceToken });
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
         const body = validate(sendNotificationSchema, req.body);

         await this._service.pushNotification(body);
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
         const result = await this._service.getNotifications(req.user.id);
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
         const body = validate(markAsReadSchema, req.body);
         const result = await this._service.markAsRead(req.user?.id, body.ids);
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
   new NotificationService(
      new NotificationRepository(), //
      new FCM()
   )
);
