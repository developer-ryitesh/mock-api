import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useState } from "react";
import { authService } from "../../services/auth.service";
import { useAppRouter } from "@/libs/router/hooks";

const initialValues = {
   email: "",
   otp: "",
   newPassword: "",
   step: 1,
   exp: 0,
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
         const data = await dispatch(authService.forgotPassword.api({ email: fields.email })).unwrap();
         console.log(data);
         setFields((prev) => ({
            ...prev,
            exp: data.data.expiresIn,
            step: 2,
         }));
      } catch (error) {
         return;
      }
   };

   const onResetPassaword = async () => {
      try {
         await dispatch(
            authService.resetPassword.api({
               newPassword: fields.newPassword,
               confirmPassword: fields.newPassword,
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
