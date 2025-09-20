import createHttpError from "http-errors";
import User from "../../../models/user.model";
import Notification from "../../../models/notification.model";

export default class NotificationRepository {
   saveDeviceToken = async (id: string, deviceToken: string) => {
      try {
         const data = await User.updateOne(id, { deviceToken });
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
