import type { ZodType } from "zod";

export function zodValidator<T>(schema: ZodType<T>) {
   return (values: T) => {
      const result = schema.safeParse(values);

      if (result.success) return {};

      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
         const field = issue.path[0];
         if (field) errors[field as string] = issue.message;
      }

      return errors;
   };
}
