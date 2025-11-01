import { useAppSelector } from "@/libs/redux/hooks";
import type { IUser } from "@/types/User.type";
import { Navigate, Outlet } from "react-router";

type Props = Readonly<{
  allowedRoles?: IUser["role"][];
}>;

export default function AuthGuard({ allowedRoles }: Props) {
  const { session, accessToken } = useAppSelector((state) => state.auth);

  const role = session.data?.role as IUser["role"];

  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }
  if (!session.data) {
    return <Navigate to="/auth" replace />;
  }
  if (allowedRoles && !allowedRoles?.includes(role)) {
    return (
      <p className="text-sm text-red-600 mt-1">
        You do not have permission to view this content.
      </p>
    );
  }
  return <Outlet />;
}
