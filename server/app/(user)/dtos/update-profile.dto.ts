import { z } from "zod";

export const profileSchema = z
   .object({
      name: z //
         .string("Name is required")
         .min(2, "Name must be at least 2 characters")
         .max(50, "Name cannot exceed 50 characters"),

      lastname: z //
         .string("Lastname is required")
         .min(2, "Lastname must be at least 2 characters")
         .max(50, "Lastname cannot exceed 50 characters"),

      bio: z //
         .string("Bio is required")
         .max(200, "Bio cannot exceed 200 characters")
         .optional(),
   })
   .strict();

export type ProfileDTO = z.infer<typeof profileSchema>;
