import { configureStore } from "@reduxjs/toolkit";
import configs from "@/configs";
import { loggerMiddlewareRedux, toastMiddlewareRedux } from "../middlewares";

const store = configureStore({
   reducer: configs.rootReducers,
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat([
         loggerMiddlewareRedux, //
         toastMiddlewareRedux, //
      ]);
   },
});

export default store;
