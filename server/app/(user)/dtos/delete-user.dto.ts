import { z } from "zod";

export const deleteUserSchema = z
   .object({
      id: z //
         .string("id is required"),
   })
   .strict();

export type DeleteUserDTO = z.infer<typeof deleteUserSchema>;
