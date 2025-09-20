import type { MassagePayload } from "../../../libs/firebase/utils/notification.service";


export type NotificationSubscribeDTO = {
   deviceToken: string;
};
export type MarkAsReadDTO = {
   ids: string[];
};

export interface PushNotificationDTO extends MassagePayload {
   ids: string[];
}



