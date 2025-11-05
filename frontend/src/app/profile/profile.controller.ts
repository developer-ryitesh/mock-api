import { authService } from "@/app/(auth)/services/auth.service";
import type { IFormikSubmit } from "@/libs/formik";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";

export default function useProfileController() {
   const { session, updateProfile, updatePassword } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   const onProfileUpdate = async (values: any) => {
      try {
         const payload = {
            fullName: `${values.first_name} ${values.last_name}`,
            bio: values.bio,
         };
         await dispatch(authService.updateProfile.api(payload)).unwrap();
      } catch (error) {
         return;
      }
   };

   const onPasswordUpdate: IFormikSubmit = async (payload: any, formikHelpers) => {
      try {
         await dispatch(authService.updatePassword.api(payload)).unwrap();
         formikHelpers?.resetForm();
      } catch (error) {
         return;
      }
   };

   return { onProfileUpdate, onPasswordUpdate, session, updateProfile, updatePassword };
}
