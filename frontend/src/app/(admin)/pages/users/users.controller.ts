import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { adminUserService } from "../../services/admin-user.service";
import type { InviteUserDTO } from "../../types/admin.dto";
import type { IFormikSubmit } from "@/libs/formik";

export default function useUsersController() {
   const dispatch = useAppDispatch();
   const { getUsers, inviteUser } = useAppSelector((state) => state.admin.user);

   const onInviteUser: IFormikSubmit = async (values: InviteUserDTO, formikHelpers) => {
      try {
         await dispatch(adminUserService.inviteUser.api(values)).unwrap();
         formikHelpers?.callback?.();
         onFetchUsers();
      } catch (error) {
         return;
      }
   };

   const onFetchUsers = () => {
      dispatch(adminUserService.getUsers.api());
   };
   useEffect(() => {
      onFetchUsers();
      return () => {};
   }, []);

   return { getUsers, onInviteUser, inviteUser };
}
