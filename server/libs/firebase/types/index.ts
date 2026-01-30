import { INotificationModal } from "../../../app/(notification)/model/notification.model";

export interface ISend {
   tokens: string[];
   userIds: string[];
   payload: Omit<INotificationModal, "userId" | "id" | "isRead">;
}
