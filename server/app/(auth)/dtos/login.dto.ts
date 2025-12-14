import { z } from "zod";

export const loginSchema = z
   .object({
      email: z //
         .string("Email is required!")
         .email("Invalid email format"),
      password: z //
         .string("Password is required!")
         .min(6, "Password must be at least 6 characters"),
   })
   .strict();

export type LoginDTO = z.infer<typeof loginSchema>;
