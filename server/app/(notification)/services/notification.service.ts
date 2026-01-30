import NotificationRepository from "../repositories/notification.repository";
import createHttpError from "http-errors";
import { SendNotificationDTO } from "../dtos/send-notification.dtos";
import { FCM } from "../../../libs/firebase";

export default class NotificationService {
   constructor(private _repo: NotificationRepository, private _fcm: FCM) {}

   subscribe = async ({ userId, deviceToken }: { userId: string; deviceToken: string }) => {
      await this._repo.saveDeviceToken(userId, deviceToken);
   };

   pushNotification = async (body: SendNotificationDTO) => {
      const result = await this._repo.getDeviceTokensByUserIds(body.userIds);
      await this._fcm.send({
         tokens: result.map((_) => _.deviceToken),
         userIds: body.userIds,
         payload: {
            title: body.title,
            body: body.body,
            priority: body.priority as any,
            type: body.type as any,
            icon: body?.icon as string,
            url: body?.url as string,
            imageUrl: body.imageUrl as string,
            data: body.data || {}, //json
         },
      });

      // new FirebaseNotification({
      //    title: body.title,
      //    body: body.body,
      //    priority: body.priority as any,
      //    type: body.type as any,
      // }).send(body.userIds);
   };

   getNotifications = async (userId: string) => {
      const result = await this._repo.notificationsByUserId(userId);
      return result;
   };

   markAsRead = async (userId: string, ids: string[]) => {
      const result = await this._repo.markAsReadById({
         ids: ids,
         userId: userId,
      });
      if (!result.length) {
         throw createHttpError.BadRequest("Unread notification not found or already read");
      }
      return result;
   };
}
