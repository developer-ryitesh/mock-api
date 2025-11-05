import { useAppSelector } from "@/libs/redux/hooks";

export default function useNotificationController() {
   const { notifications, markAsRead } = useAppSelector((state) => state.notification);

   return { notifications, markAsRead };
}
