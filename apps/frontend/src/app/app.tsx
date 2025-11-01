import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import AppRouting from "./app.routing";
import { Loading, ProgressBar } from "@/shared/components";
import { useEffect } from "react";
import { authService } from "./(auth)/services/auth.service";
import { notificationService } from "./(notification)/services/notification.service";

export default function App() {
   const { session, accessToken } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (accessToken) {
         dispatch(authService.session.api());
         dispatch(notificationService.getAllNotifications.api());
      }
      return () => {};
   }, [accessToken]);

   return (
      <>
         <ProgressBar />
         {session.isLoading && accessToken ? ( //
            <Loading loading className="h-screen" />
         ) : (
            <AppRouting />
         )}
      </>
   );
}
