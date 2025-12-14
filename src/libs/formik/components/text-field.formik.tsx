import { TextField } from "@/shared/ui";
import { Field } from "formik";
import { ErrorMessageFormik } from "./error-message.formik";
import type { TextFieldProps } from "@/shared/ui/text-field.ui";

export function TextFieldFormik({ className, eleSize, ...props }: TextFieldProps) {
   return (
      <div className={className}>
         <Field name={props.name}>
            {({ field, meta }: any) => (
               <TextField
                  {...props}
                  {...field} // <-- Gives value, onChange, onBlur
                  error={meta.touched && meta.error ? meta.error : undefined}
                  eleSize={eleSize}
               />
            )}
         </Field>

         {props?.name && <ErrorMessageFormik name={props.name} />}
      </div>
   );
}
