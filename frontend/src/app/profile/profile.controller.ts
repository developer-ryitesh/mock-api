import type { IFormikSubmit } from "@/libs/formik";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { profileService } from "./services/profile.service";

export default function useProfileController() {
   const { session, updateProfile, updatePassword } = useAppSelector((state) => state.profile);
   const dispatch = useAppDispatch();

   const onProfileUpdate = async (values: any) => {
      try {
         const payload = {
            fullName: `${values.first_name} ${values.last_name}`,
            bio: values.bio,
         };
         await dispatch(profileService.updateProfile.api(payload)).unwrap();
      } catch (error) {
         return;
      }
   };

   const onPasswordUpdate: IFormikSubmit = async (payload: any, formikHelpers) => {
      try {
         await dispatch(profileService.updatePassword.api(payload)).unwrap();
         formikHelpers?.resetForm();
      } catch (error) {
         return;
      }
   };

   return { onProfileUpdate, onPasswordUpdate, session, updateProfile, updatePassword };
}
