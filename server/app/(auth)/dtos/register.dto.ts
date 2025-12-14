import { z } from "zod";

export const registerSchema = z
   .object({
      email: z //
         .string("Email is required")
         .email("Invalid email address"),
      password: z //
         .string("Password is required")
         .min(8, "Password must be at least 8 characters"),
      confirmPassword: z //
         .string("Confirm password is required"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // error will be attached to confirmPassword
   })
   .strict();

// Type inferred from schema
export type RegisterDTO = z.infer<typeof registerSchema>;

// If you want a DTO used for creating the user (without confirmPassword):
export const createUserSchema = registerSchema.omit({ confirmPassword: true });
export type CreateUserDTO = z.infer<typeof createUserSchema>;
