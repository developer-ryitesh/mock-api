import { z } from "zod";

export const forgotPasswordSchema = z
   .object({
      email: z //
         .string("Email is required")
         .email("Invalid email format"),
   })
   .strict();

export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
