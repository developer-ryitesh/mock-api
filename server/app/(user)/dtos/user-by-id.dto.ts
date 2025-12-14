import { z } from "zod";

export const userByIdSchema = z
   .object({
      id: z //
         .string("id is required"),
   })
   .strict();

export type UserByIdDTO = z.infer<typeof userByIdSchema>;
