// src/global.d.ts

import type LoggerType from "@/libs/logger";
import "formik";

declare module "formik" {
   interface FormikHelpers<Values> {
      callback?: () => void;
   }
}

declare global {
   const Logger: typeof LoggerType;
   interface GlobalThis {
      Logger: typeof LoggerType;
   }
}

export {};
