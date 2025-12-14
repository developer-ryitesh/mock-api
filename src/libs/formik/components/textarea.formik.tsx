import { Textarea } from "@/shared/ui";
import type { TextareaProps } from "@/shared/ui";
import { Field } from "formik";
import { ErrorMessageFormik } from "./error-message.formik";

export function TextareaFormik(props: TextareaProps) {
   return (
      <div>
         <Field name={props.name}>
            {({ field, meta }: any) => (
               <Textarea
                  {...props}
                  {...field} // gives value, onChange, onBlur
                  error={meta.touched && meta.error ? meta.error : undefined}
               />
            )}
         </Field>
         {props?.name && <ErrorMessageFormik name={props?.name} />}
      </div>
   );
}
