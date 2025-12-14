import { toast as sonnerToast } from "sonner";
import type { SnackbarProps } from "../types";
import { DoneSnackbar } from "../components/done.snackbar";
import { WarnSnackbar } from "../components/warn.snackbar";
import { ErrorSnackbar } from "../components/error.snackbar";
import { DefaultSnackbar } from "../components/default.snackbar";

function snackbar(toast: Omit<SnackbarProps, "id">) {
   return sonnerToast.custom((id) => {
      switch (toast.type) {
         case "DONE":
            return <DoneSnackbar id={id} {...toast} />;
         case "WARN":
            return <WarnSnackbar id={id} {...toast} />;
         case "ERROR":
            return <ErrorSnackbar id={id} {...toast} />;
         default:
            return <DefaultSnackbar id={id} {...toast} />;
      }
   });
}

export { snackbar };
