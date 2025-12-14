import createHttpError from "http-errors";
import Notification from "../model/notification.model";
import DeviceToken from "../model/device-token.model";

export default class NotificationRepository {
   saveDeviceToken = async (userId: string, deviceToken: string) => {
      try {
         const hasToken = await DeviceToken.findOne({ field: "userId", value: userId });
         if (hasToken) {
            const data = await DeviceToken.updateOne(hasToken?.id, { deviceToken });
            return data;
         } else {
            const data = await DeviceToken.create({ userId, deviceToken });
            return data;
         }
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   getDeviceTokensByUserIds = async (userIds: string[]) => {
      try {
         const data = await DeviceToken.query([
            { field: "userId", operator: "in", value: userIds }, //
         ]);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   notificationsByUserId = async (userId: string) => {
      try {
         const data = await Notification.find({ userId });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };

   markAsReadById = async (arg: { userId: string; ids: string[] }) => {
      try {
         const notifications = await Notification.query([
            { field: "id", operator: "in", value: arg.ids }, //
            { field: "userId", operator: "==", value: arg.userId }, //
            { field: "isRead", operator: "==", value: false }, //
         ]);
         const batchDocs = notifications.map((notification) => ({
            id: notification.id,
            data: { isRead: true },
         }));
         const data = await Notification.updateMany(batchDocs);
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   };
}
