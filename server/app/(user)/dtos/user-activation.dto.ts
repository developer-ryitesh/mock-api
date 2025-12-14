import { z } from "zod";

export const userActivationSchema = z
   .object({
      userId: z //
         .string("User ID is required")
         .min(1, "User ID cannot be empty"),

      status: z //
         .string("Status is required")
         .refine((val) => val === "true" || val === "false", {
            message: "Status must be either 'true' or 'false'",
         }),
   })
   .strict();

export type UserActivationDTO = z.infer<typeof userActivationSchema>;
