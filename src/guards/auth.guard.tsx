import { useAppSelector } from "@/libs/redux/hooks";
import type ISessionModal from "@/modules/(user)/models/session.model";
import { Navigate, Outlet } from "react-router";

type Props = Readonly<{
   allowedRoles?: ISessionModal["role"][];
}>;

export default function AuthGuard({ allowedRoles }: Props) {
   const { getSession, accessToken } = useAppSelector((state) => state.user);

   const role = getSession.data?.role as ISessionModal["role"];

   if (!accessToken) {
      return <Navigate to="/auth" replace />;
   }
   if (!getSession.data) {
      return <Navigate to="/auth" replace />;
   }
   if (allowedRoles && !allowedRoles?.includes(role)) {
      return <p className="text-sm text-red-600 mt-1">You do not have permission to view this content.</p>;
   }
   return <Outlet />;
}
