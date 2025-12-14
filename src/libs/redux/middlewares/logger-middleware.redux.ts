import type { Middleware } from "@reduxjs/toolkit";

//=store=>(next)
const loggerMiddlewareRedux: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled")) {
      console.log(`[Dispatched] : ${action?.type}`);
   }
   if (action?.type.endsWith("/rejected")) {
      console.log(`[Dispatched] : ${action?.type}`);
   }
   return next(action);
};
export { loggerMiddlewareRedux };
