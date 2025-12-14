import type { IFormikSubmit } from "@/libs/formik";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { services } from "@/modules";

export default function useProfileController() {
   const { getSession, updateProfile, updatePassword } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const onProfileUpdate = async (values: any) => {
      try {
         const payload = {
            name: values.first_name,
            lastname: values.last_name,
            bio: values.bio,
         };
         await dispatch(services.user.updateProfile.api(payload)).unwrap();
      } catch (error) {
         return;
      }
   };

   const onPasswordUpdate: IFormikSubmit = async (payload: any, formikHelpers) => {
      try {
         await dispatch(services.user.updatePassword.api(payload)).unwrap();
         formikHelpers?.resetForm();
      } catch (error) {
         return;
      }
   };

   return { onProfileUpdate, onPasswordUpdate, getSession, updateProfile, updatePassword };
}
