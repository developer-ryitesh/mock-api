import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";

import type { IFormikSubmit } from "@/libs/formik";
import type { InviteUserDTO } from "@/modules/(user)/dtos/user.dto";
import { services } from "@/modules";

export default function useUsersController() {
   const dispatch = useAppDispatch();
   const { getUsers, inviteUser } = useAppSelector((state) => state.user);

   const onInviteUser: IFormikSubmit = async (values: InviteUserDTO, formikHelpers) => {
      try {
         await dispatch(services.user.inviteUser.api(values)).unwrap();
         formikHelpers?.callback?.();
         onFetchUsers();
      } catch (error) {
         return;
      }
   };

   const onFetchUsers = () => {
      dispatch(services.user.getUsers.api());
   };
   useEffect(() => {
      onFetchUsers();
      return () => {};
   }, []);

   return { getUsers, onInviteUser, inviteUser };
}
