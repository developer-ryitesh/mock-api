import type { NOTIFICATION_PRIORITY, NOTIFICATION_TYPE } from "../constants/notification.constant";

export interface INotification {
   id: string;
   userId: string;
   title: string;
   body: string;
   type: keyof typeof NOTIFICATION_TYPE;
   priority: keyof typeof NOTIFICATION_PRIORITY;
   createdAt: string;
   updatedAt: string;
   isRead: boolean;
}
