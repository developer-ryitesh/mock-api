import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import AppRouting from "./app.routing";
import { Loading, ProgressBar } from "@/shared/components";
import { useEffect } from "react";
import { userService } from "@/modules/(user)";
import { notificationService } from "@/modules/(notification)";

export default function App() {
   const { getSession, accessToken } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (accessToken) {
         dispatch(userService.getSession.api());
         dispatch(userService.dashboard.api());
         dispatch(notificationService.getAllNotifications.api());
      }
      return () => {};
   }, [accessToken]);

   return (
      <>
         <ProgressBar />
         {getSession.isLoading && accessToken ? ( //
            <Loading loading className="h-screen" />
         ) : (
            <AppRouting />
         )}
      </>
   );
}
