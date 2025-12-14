import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "@/modules";
import { loggerMiddlewareRedux, toastMiddlewareRedux } from "../middlewares";

const store = configureStore({
   reducer: reducers,
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat([
         loggerMiddlewareRedux, //
         toastMiddlewareRedux, //
      ]);
   },
});

export default store;
