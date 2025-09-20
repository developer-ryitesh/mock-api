import { FirestoreService } from "../libs/firebase/utils";

// Enums
const NOTIFICATION = {
   TYPE: {
      NOTIFICATION: "NOTIFICATION",
      SYSTEM_ALERT: "SYSTEM_ALERT",
      PROMOTION: "PROMOTION",
      SUBSCRIPTION: "SUBSCRIPTION",
   },
   PRIORITY: {
      high: "high",
      normal: "normal",
   },
};

// Types
type INotificationType = keyof typeof NOTIFICATION.TYPE;

interface INotificationPayload {
   type: INotificationType;
   title: string;
   body: string;
   priority: keyof typeof NOTIFICATION.PRIORITY;
   data?: Record<string, any>;
   url?: string;
   icon?: string;
   imageUrl?: string;
}

interface INotificationModal extends Omit<INotificationPayload, "data" | "url" | "icon" | "imageUrl"> {
   id?: string;
   userId: string;
   isRead: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

const Notification = new FirestoreService<INotificationModal>("notifications");
export default Notification;
export type { INotificationModal, INotificationPayload, INotificationType };
export { NOTIFICATION };
