import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useAppRouter } from "@/libs/router/hooks";
import { authService } from "@/modules/(auth)";
import { userActions } from "@/modules/(user)";

export default function useLoginController() {
   const [fields, setFields] = useState({ email: "", password: "" });
   const { login } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const router = useAppRouter();

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
   };

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
         const data = await dispatch(authService.login.api(fields)).unwrap();
         const accessToken = data?.data?.accessToken;
         localStorage.setItem("accessToken", accessToken);
         dispatch(userActions.updateToken(accessToken));
         router.replace("/");
      } catch {
         return;
      }
   };

   return { login, onSubmit, onChange, fields };
}
