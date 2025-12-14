import { z } from "zod";

export const notificationSubscribeSchema = z
   .object({
      deviceToken: z //
         .string("Device token is required")
         .min(1, "Device token cannot be empty"),
   })
   .strict();

export type NotificationSubscribeDTO = z.infer<typeof notificationSubscribeSchema>;
