import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { adminUserService } from "../../services/admin-user.service";
import type { UserStatusDTO } from "../../types/admin.dto";

export default function useUserInfoController() {
   const { id } = useParams<{ id: string }>();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { getSingleUser, userStatus, deleteUser } = useAppSelector((state) => state.admin.user);

   const onChangeStatusUser = async (status: UserStatusDTO["status"]) => {
      try {
         if (!id) return;
         await dispatch(adminUserService.userStatus.api({ id: id, status })).unwrap();
      } catch (error) {
         return;
      }
   };

   const onDeleteUser = async (id: string) => {
      try {
         await dispatch(adminUserService.deleteUser.api(id)).unwrap();
         navigate("/admin/users", { replace: true });
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (id) dispatch(adminUserService.getSingleUser.api(id));
      return () => {};
   }, [id]);

   return { getSingleUser, onChangeStatusUser, userStatus, onDeleteUser, deleteUser };
}
