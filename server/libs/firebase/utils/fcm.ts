import Notification from "../../../app/(notification)/model/notification.model";
import firebase from "../configs";
import { ISend } from "../types";

export class FCM {
   send = async ({ tokens, userIds, payload }: ISend) => {
      if (!tokens || tokens.length === 0) {
         return { success: 0, failure: 0, invalidTokens: [] };
      }

      const data: ISend["payload"] = {
         title: payload.title,
         body: payload.body,
         priority: payload.priority,
         type: payload.type,
         icon: payload.icon || "",
         url: payload.url || "",
         imageUrl: payload.imageUrl || "",
         data: JSON.stringify(payload.data) || "{}",
      };

      try {
         const res = await firebase.messaging().sendEachForMulticast({
            tokens,
            notification: {
               title: payload.title,
               body: payload.body,
               ...(payload.imageUrl && { imageUrl: payload.imageUrl }),
            },
            data: data as any,
         });

         const invalidTokens: string[] = [];

         res.responses.forEach((res, index) => {
            if (!res.success) {
               const error = (res.error?.message || "").toLowerCase();
               if (error.includes("notregistered") || error.includes("invalidregistration") || error.includes("missingregistration")) {
                  invalidTokens.push(tokens[index]);
               }
            }
         });
         const notifications = userIds.map((userId) => ({
            userId: userId,
            ...data,
         }));

         try {
            await Notification.insertMany(notifications as any);
         } catch (error) {
            console.error("Notification save error:", error);
         }
         return {
            success: res.successCount,
            failure: res.failureCount,
            invalidTokens,
         };
      } catch (err) {
         console.error("FCM send error:", err);
         throw err;
      }
   };
}
