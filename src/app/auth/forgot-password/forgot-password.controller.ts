import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useState } from "react";
import { useAppRouter } from "@/libs/router/hooks";
import { services } from "@/modules";

const initialValues = {
   email: "",
   otp: "",
   newPassword: "",
   step: 1,
   seconds: 0,
};
export default function useForgotPasswordController() {
   const dispatch = useAppDispatch();
   const { forgotPassword, resetPassword } = useAppSelector((state) => state.auth);
   const [fields, setFields] = useState(initialValues);
   const router = useAppRouter();
   const onChange = (e: any) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
   };

   const onRequestOtp = async () => {
      try {
         const { data } = await dispatch(services.auth.forgotPassword.api({ email: fields.email })).unwrap();
         setFields((prev) => ({
            ...prev,
            seconds: data.seconds,
            step: 2,
         }));
      } catch (error) {
         return;
      }
   };

   const onResetPassaword = async () => {
      try {
         await dispatch(
            services.auth.resetPassword.api({
               newPassword: fields.newPassword,
               otp: fields?.otp,
            })
         ).unwrap();
         setFields(initialValues);
         router.replace("/auth/login");
      } catch (error) {
         return;
      }
   };

   return { fields, onChange, onRequestOtp, forgotPassword, onResetPassaword, resetPassword };
}
