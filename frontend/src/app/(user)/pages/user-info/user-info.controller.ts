import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useEffect } from "react";
import { useParams } from "react-router";
import { adminUserService } from "../../services/admin-user.service";
import type { UserStatusDTO } from "../../types/admin.dto";

export default function useUserInfoController() {
   const { id } = useParams<{ id: string }>();
   const dispatch = useAppDispatch();
   const { getSingleUser, userStatus } = useAppSelector((state) => state.admin.user);

   const onChangeStatusUser = async (status: UserStatusDTO["status"]) => {
      try {
         if (!id) return;
         await dispatch(adminUserService.userStatus.api({ id: id, status })).unwrap();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (id) dispatch(adminUserService.getSingleUser.api(id));
      return () => {};
   }, [id]);

   return { getSingleUser, onChangeStatusUser, userStatus };
}
