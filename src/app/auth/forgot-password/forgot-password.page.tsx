import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import useForgotPasswordController from "./forgot-password.controller";
import { Link } from "react-router";
import { Button, TextField } from "@/shared/ui";
import { TimerField } from "@/shared/components";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Forgot Password</title>
      </Helmet>
      {children}
   </>
);

export default function ForgotPasswordPage() {
   const ctrl = useForgotPasswordController();
   return (
      <HelmetContainer>
         <form>
            <div className="flex flex-col gap-6">
               <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Forgot Password</h1>
               </div>
               <div className="flex flex-col gap-2">
                  {ctrl.fields.step === 1 && ( //
                     <>
                        <TextField //
                           label="Email"
                           type="email"
                           name="email"
                           value={ctrl.fields.email}
                           onChange={ctrl.onChange}
                           required
                        />
                        <Button type="button" onClick={ctrl.onRequestOtp} loading={ctrl.forgotPassword.isLoading}>
                           Send otp
                        </Button>
                     </>
                  )}
                  {ctrl.fields.step === 2 && ( //
                     <>
                        <div className="flex items-center justify-between">
                           <label htmlFor="otp" className="block text-sm font-medium text-gray-70">
                              OTP
                           </label>
                           <TimerField
                              name="exp"
                              value={ctrl.fields.exp}
                              Render={(time) => <span className="text-red-500 text-sm">{time}</span>}
                              onChange={ctrl.onChange}
                              Trigger={() => (
                                 <Button type="button" className="p-0" variant="link" onClick={ctrl.onRequestOtp} loading={ctrl.forgotPassword.isLoading}>
                                    Resend
                                 </Button>
                              )}
                           />
                        </div>
                        <TextField //
                           type="text"
                           name="otp"
                           value={ctrl.fields.otp}
                           onChange={ctrl.onChange}
                           required
                        />
                        <TextField //
                           label="New Password"
                           type="text"
                           name="newPassword"
                           value={ctrl.fields.newPassword}
                           onChange={ctrl.onChange}
                           required
                        />
                        <Button type="button" onClick={ctrl.onResetPassaword} loading={ctrl.resetPassword.isLoading}>
                           Reset Password
                        </Button>
                     </>
                  )}
               </div>
               <div className="text-center text-sm">
                  <Link to="/auth/login" className="underline underline-offset-4">
                     Back to login
                  </Link>
               </div>
            </div>
         </form>
      </HelmetContainer>
   );
}
