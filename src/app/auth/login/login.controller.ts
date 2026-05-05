import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useAppRouter } from "@/libs/router/hooks";
import { authService } from "@/modules/(auth)/services";
import { userActions } from "@/modules/(user)/services";
import type { IFormikSubmit } from "@/libs/formik";

export default function useLoginController() {
   const fields = { email: "", password: "" };
   const { login } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const router = useAppRouter();

   const onSubmit: IFormikSubmit = async (value) => {
      try {
         const data = await dispatch(authService.login.api(value)).unwrap();
         const accessToken = data?.data?.accessToken;
         localStorage.setItem("accessToken", accessToken);
         dispatch(userActions.updateToken(accessToken));
         router.replace("/");
      } catch {
         return;
      }
   };

   return { login, onSubmit, fields };
}
