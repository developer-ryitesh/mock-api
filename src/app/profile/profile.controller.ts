import type { IFormikSubmit } from "@/libs/formik";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { userService } from "@/modules/(user)/services";

export default function useProfileController() {
   const { getSession, updateProfile, updatePassword } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const onProfileUpdate: IFormikSubmit = async (values: any) => {
      try {
         const payload = {
            name: values.name,
            lastname: values.lastname,
            bio: values.bio,
         };
         await dispatch(userService.updateProfile.api(payload)).unwrap();
      } catch (error) {
         return;
      }
   };

   const onPasswordUpdate: IFormikSubmit = async (payload: any, formikHelpers) => {
      try {
         await dispatch(userService.updatePassword.api(payload)).unwrap();
         formikHelpers?.resetForm();
      } catch (error) {
         return;
      }
   };

   return { onProfileUpdate, onPasswordUpdate, getSession, updateProfile, updatePassword };
}
