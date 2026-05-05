// utils/zodFormikAdapter.ts
import { ZodType } from "zod";

export const validator =
   <T>(schema: ZodType<T>) =>
   (values: T) => {
      const result = schema.safeParse(values);

      if (result.success) return {};

      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
         const field = issue.path.join(".");
         errors[field] = issue.message;
      });

      return errors;
   };
