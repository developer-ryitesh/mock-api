// types/formik-helpers-augmentation.d.ts

import "formik";

declare module "formik" {
   interface FormikHelpers<Values> {
      callback?: () => void;
   }
}
