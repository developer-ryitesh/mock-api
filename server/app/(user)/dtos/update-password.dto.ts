import { z } from "zod";

export const updatePasswordSchema = z
   .object({
      oldPassword: z //
         .string("Old password is required")
         .min(6, "Old password must be at least 6 characters"),

      newPassword: z //
         .string("New password is required")
         .min(6, "New password must be at least 6 characters"),
   })
   .refine((data) => data.oldPassword !== data.newPassword, {
      message: "New password must be different from old password",
      path: ["newPassword"],
   })
   .strict();

export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;
