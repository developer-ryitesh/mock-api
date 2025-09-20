import { v4 as uuidv4 } from "uuid";
import firebase from "../configs";
import type { Message } from "firebase-admin/lib/messaging/messaging-api";
import Notification, { INotificationPayload } from "../../../models/notification.model";
import User from "../../../models/user.model";

export type MassagePayload = INotificationPayload & { data?: Record<string, string> };

export class FirebaseNotification {
   constructor(private payload: MassagePayload) {}

   private save = async (userId: string) => {
      try {
         const notification = await Notification.create({
            isRead: false,
            userId,
            title: this.payload.title,
            body: this.payload.body,
            type: this.payload.type,
            priority: this.payload.priority,
         });
         return notification;
      } catch (error) {
         console.error(`Failed to save notification for user ${userId}:`, error);
         return null;
      }
   };

   private getTokens = async (userIds: string[]) => {
      try {
         const users = await User.query([{ field: "id", operator: "in", value: userIds }]);
         return users;
      } catch (error) {
         return [];
      }
   };

   send = async (userIds: string[]) => {
      try {
         if (!userIds?.length) throw new Error("No user ids provided");
         const users = await this.getTokens(userIds);
         if (!users.length) return [];
         await Promise.all(users.map((user) => this.save(user.id)));
         const messages: Message[] = users
            .filter((user) => user.deviceToken) // ignore users without tokens
            .map((user) => ({
               token: user.deviceToken!,
               notification: {title: this.payload.title, body: this.payload.body },
               data: { date: new Date().toISOString(), url: this.payload.url || "",
                  notificationId: uuidv4(), ...this.payload.data,
               },
               android: { priority: this.payload.priority },
               apns: { headers: { "apns-priority": "10" } },
               webpush: { headers: { Urgency: this.payload.priority } },
            }));
         const send = firebase.admin.messaging().send;
         const res = await Promise.all(messages.map((message) => send(message)));
         return res;
      } catch (error) {
         console.error("Firebase send error:", error);
         return null;
      }
   };
}

/* 
  await new FirebaseNotification({
                title: "",
                body: "",
                type: "NOTIFICATION",
                priority: "high",
    }).send([user.id]);

*/
