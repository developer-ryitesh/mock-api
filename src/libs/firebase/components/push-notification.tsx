import { useEffect, useState } from "react";
import { snackbar } from "@/libs/snackbar/utils";
import firebase from "@/libs/firebase/config";
import { useAppDispatch } from "@/libs/redux/hooks";
import { Button } from "@/shared/ui";
import Sound from "@/assets/audios";
import configs from "@/configs";

export function PushNotification({ onRefresh }: { onRefresh?: () => void }) {
   const [permission, setPermission] = useState(Notification.permission);
   const cachesdDeviceToken = localStorage.getItem("deviceToken");
   const isEnable = permission !== "granted" && permission !== "denied";
   const dispatch = useAppDispatch();

   const notificationPermissionRequest = async () => {
      try {
         const result = await Notification.requestPermission();
         setPermission(result);
         if (result === "granted" && !cachesdDeviceToken) {
            const newDeviceToken = await firebase.getDeviceToken();
            await dispatch(configs.subscribe.api(newDeviceToken)).unwrap();
            localStorage.setItem("deviceToken", newDeviceToken);
         }
      } catch (err) {
         console.error("Permission error:", err);
      }
   };

   useEffect(() => {
      if (permission === "granted" && !cachesdDeviceToken) notificationPermissionRequest();
      return () => {};
   }, [permission, cachesdDeviceToken]);

   useEffect(() => {
      const unsubscribe = firebase.onMessage(firebase.messaging, async (payload) => {
         onRefresh?.();
         Logger.debug(payload);
         snackbar({
            title: payload?.notification?.title || "",
            body: payload?.notification?.body || "",
            type: "NOTIFICATION",
            action: { label: "dismiss", onClick: () => null },
         });
         Sound.newNotification.play();
      });
      return unsubscribe;
   }, []);

   return (
      <>
         {isEnable && (
            <div className="w-full max-w-md bg-green-50 p-4 gap-3 rounded-2xl mb-3">
               <h2 className="text-sm font-medium">Enable Notifications</h2>
               <p className="text-xs text-gray-600">Get instant updates directly in your browser.</p>
               <Button size="xs" accent="done" variant="link" type="button" onClick={notificationPermissionRequest} className="px-0">
                  Turn On
               </Button>
            </div>
         )}
      </>
   );
}
