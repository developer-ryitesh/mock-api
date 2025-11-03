import { ErrorMessage, type ErrorMessageProps, type FormikContextType } from "formik";
import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";

type Props = Omit<
   React.FC<ErrorMessageProps> &
      hoistNonReactStatics.NonReactStatics<
         React.ComponentClass<
            ErrorMessageProps & {
               formik: FormikContextType<
                  ErrorMessageProps & {
                     formik: FormikContextType<any>;
                  }
               >;
            },
            any
         >,
         {}
      >,
   "name"
> & {
   name: string;
};

export function ErrorMessageFormik({ ...props }: Props) {
   return <ErrorMessage {...props} component="small" className="text-red-500 text-xs" />;
}
