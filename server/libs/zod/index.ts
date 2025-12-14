import type { ZodType, infer as zodInfer } from "zod";
import createHttpError from "http-errors";
import { z } from "zod";

export function validate<T>(schema: ZodType<T>, payload: unknown): T {
   const result = schema.safeParse(payload);

   if (!result.success) {
      const message = result.error?.issues?.[0]?.message || "Invalid payload";
      throw createHttpError.BadRequest(message);
   }

   return result.data;
}

export type Zod<T> = z.infer<T>;
