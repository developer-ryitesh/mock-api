import { z } from "zod";

export const markAsReadSchema = z
   .object({
      ids: z //
         .array(z.string().min(1, "ID cannot be empty"))
         .min(1, "At least one ID is required"), // For empty array
   })
   .strict();

export type MarkAsReadDTO = z.infer<typeof markAsReadSchema>;
