import { Firestore } from "../../../libs/firebase";

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

interface INotificationModal {
   id: string;
   userId: string;
   title: string;
   body: string;
   priority: keyof typeof NOTIFICATION.PRIORITY;
   type: INotificationType;
   icon: string;
   url: string;
   imageUrl: string;
   data: any; //json
   isRead: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

const Notification = new Firestore<INotificationModal>("notifications");
export default Notification;
export type { INotificationModal, INotificationType };
export { NOTIFICATION };
