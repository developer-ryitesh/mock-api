import { z } from "zod";
import { NOTIFICATION } from "../model/notification.model";
const TYPES = Object.keys(NOTIFICATION.TYPE);
const PRIORITIES = Object.keys(NOTIFICATION.PRIORITY);

export const sendNotificationSchema = z
   .object({
      userIds: z //
         .array(z.string().min(1, "ID cannot be empty"))
         .nonempty("At least one user ID is required"),

      title: z //
         .string("Title is required")
         .min(1, "Title cannot be empty"),

      body: z //
         .string("Body is required")
         .min(1, "Body cannot be empty"),

      priority: z //
         .string("Priority is required")
         .refine((val) => PRIORITIES.includes(val), {
            message: `Priority must be one of:: ${PRIORITIES.join(" , ")}`,
         }),

      type: z //
         .string("Type is required")
         .refine((val) => TYPES.includes(val), {
            message: `Type must be either : ${TYPES.join(" , ")}`,
         }),
      url: z //
         .string()
         .optional(),
      icon: z //
         .string()
         .optional(),
      imageUrl: z //
         .string()
         .optional(),
      data: z //
         .object({})
         .catchall(z.any())
         .optional(),
   })
   .strict();

export type SendNotificationDTO = z.infer<typeof sendNotificationSchema>;
