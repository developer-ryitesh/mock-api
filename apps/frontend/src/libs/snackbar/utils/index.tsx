import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "../types";
import { DoneSnackbar } from "../components/done.snackbar";
import { WarnSnackbar } from "../components/warn.snackbar";
import DefaultSnackbar from "../components/default.snackbar";
import { NotificationSnackbar } from "../components/notification.snackbar";
import { ErrorSnackbar } from "../components/error.snackbar";

function snackbar(toast: Omit<ToastProps, "id">) {
   return sonnerToast.custom((id) => {
      switch (toast.type) {
         case "DONE":
            return <DoneSnackbar id={id} {...toast} />;
         case "WARN":
            return <WarnSnackbar id={id} {...toast} />;
         case "ERROR":
            return <ErrorSnackbar id={id} {...toast} />;
         case "NOTIFICATION":
            return <NotificationSnackbar id={id} {...toast} />;
         default:
            return <DefaultSnackbar id={id} {...toast} />;
      }
   });
}

export { snackbar };
