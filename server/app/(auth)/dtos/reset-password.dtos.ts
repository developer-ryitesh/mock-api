import { z } from "zod";

export const resetPasswordSchema = z
   .object({
      otp: z //
         .string("OTP is required")
         .min(4, "OTP must be at least 4 characters"),

      newPassword: z //
         .string("New password is required")
         .min(8, "Password must be at least 8 characters"),
   })
   .strict();

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
