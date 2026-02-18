import { IsolationTemplate, withSafeBoundary } from "@/shared/components";
import { type ReactNode } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/shared/ui";
import useLoginController from "./login.controller";
import { Link } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Form, Formik } from "formik";
import { loginSchema } from "@/modules/(auth)/validators";
import { TextFieldFormik } from "@/libs/formik";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Login</title>
      </Helmet>
      {children}
   </>
);

const LoginPage = withSafeBoundary(() => {
   const ctrl = useLoginController();

   return (
      <HelmetContainer>
         <Formik initialValues={ctrl.fields} onSubmit={ctrl.onSubmit} validationSchema={loginSchema}>
            <Form className="flex flex-col gap-6">
               <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Login to your account</h1>
               </div>
               <div className="grid gap-3">
                  <div>
                     <TextFieldFormik label="Email" type="email" name="email" />
                  </div>

                  <div>
                     <div className="flex items-center mb-2">
                        <label htmlFor="password" className="font-normal">
                           Password
                        </label>
                        <Link to="/auth/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                           Forgot your password?
                        </Link>
                     </div>
                     <IsolationTemplate vars={{ isShow: false }}>
                        {({ vars, set }) => (
                           <TextFieldFormik //
                              type={vars.isShow ? "text" : "password"}
                              name="password"
                              suffixIcon={
                                 <button type="button" className="cursor-pointer" onClick={() => set({ isShow: !vars.isShow })}>
                                    {vars.isShow ? <FiEye /> : <FiEyeOff />}
                                 </button>
                              }
                           />
                        )}
                     </IsolationTemplate>
                  </div>
                  <div>
                     <Button type="submit" className="w-full" loading={ctrl.login.isLoading}>
                        Login
                     </Button>
                  </div>
               </div>
            </Form>
         </Formik>
      </HelmetContainer>
   );
});

export default LoginPage;
