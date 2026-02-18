import { configureStore } from "@reduxjs/toolkit";
import configs from "@/configs";
import middlewares from "../middlewares";

const store = configureStore({
   reducer: configs.rootReducers,
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(middlewares);
   },
});

export default store;
