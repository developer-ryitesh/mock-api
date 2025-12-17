import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import AppRouting from "./app.routing";
import { Loading, ProgressBar } from "@/shared/components";
import { useEffect } from "react";
import { services } from "@/modules";

export default function App() {
   const { getSession, accessToken } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (accessToken) {
         dispatch(services.user.getSession.api());
         dispatch(services.user.dashboard.api());
         dispatch(services.notification.getAllNotifications.api());
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
