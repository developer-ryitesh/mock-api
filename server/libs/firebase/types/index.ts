import { INotificationPayload } from "../../../app/(notification)/model/notification.model";

export interface ISend {
   tokens: string[];
   payload: INotificationPayload;
}
