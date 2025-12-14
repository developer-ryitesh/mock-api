import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { services } from "@/modules";
import type { UserStatusDTO } from "@/modules/(user)/dtos/user.dto";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function useUserInfoController() {
   const { id } = useParams<{ id: string }>();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { getSingleUser, userStatus, deleteUser } = useAppSelector((state) => state.user);

   const onChangeStatusUser = async (status: UserStatusDTO["status"]) => {
      try {
         if (!id) return;
         await dispatch(services.user.userStatus.api({ userId: id, status })).unwrap();
      } catch (error) {
         return;
      }
   };

   const onDeleteUser = async (id: string) => {
      try {
         await dispatch(services.user.deleteUser.api(id)).unwrap();
         navigate("/admin/users", { replace: true });
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (id) dispatch(services.user.getSingleUser.api(id));
      return () => {};
   }, [id]);

   return { getSingleUser, onChangeStatusUser, userStatus, onDeleteUser, deleteUser };
}
