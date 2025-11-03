import type { FormikHelpers } from "formik";

export type IFormikSubmit = (values: any, formikHelpers?: FormikHelpers<any>) => void;

export type IFormComponent<T> = {
   onSubmit: IFormikSubmit;
   patchValues?: T;
   loading?: boolean;
};
