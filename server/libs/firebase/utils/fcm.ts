import firebase from "../configs";
import { ISend } from "../types";

export class FCM {
   send = async ({ tokens, payload }: ISend) => {
      if (!tokens || tokens.length === 0) {
         return { success: 0, failure: 0, invalidTokens: [] };
      }

      try {
         const res = await firebase.messaging().sendEachForMulticast({
            tokens,
            notification: {
               title: payload.title,
               body: payload.body,
               ...(payload.imageUrl && { imageUrl: payload.imageUrl }),
            },
            data: {
               title: payload.title,
               body: payload.body,
               priority: payload.priority,
               type: payload.type,
               ...(payload.icon && { icon: payload.icon }),
               ...(payload.url && { url: payload.url }),
               ...(payload.imageUrl && { imageUrl: payload.imageUrl }),
               ...(payload.data && { data: JSON.stringify(payload.data) }),
            },
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
