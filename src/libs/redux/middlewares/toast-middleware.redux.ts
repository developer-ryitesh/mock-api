import { snackbar } from "@/libs/snackbar/utils";
import type { Middleware } from "@reduxjs/toolkit";

//=store=>(next)
const toastMiddlewareRedux: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled") && !action?.type?.includes("!")) {
      snackbar({
         title: "Success",
         body: action?.payload?.message,
         type: "DONE",
         action: {
            label: "close",
            onClick: () => null,
         },
      });
   }
   if (action?.type.endsWith("/rejected") && !action?.type?.includes("!")) {
      const error = action?.payload;
      snackbar({
         title: "Error",
         body:  error.response?.data?.error?.message || error?.message,
         type: "ERROR",
         action: {
            label: "close",
            onClick: () => null,
         },
      });
   }
   return next(action);
};
export { toastMiddlewareRedux };
