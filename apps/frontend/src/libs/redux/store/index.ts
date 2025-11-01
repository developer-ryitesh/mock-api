import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddlewareRedux, toastMiddlewareRedux } from "../middlewares";

import { createReducerManager } from "./reducerManager";
import exportConfig from "@/app/export";

const reducers = exportConfig.redux.reducers;
const middlewares = exportConfig.redux.middlewares;

const makeStore = () => {
   const reducerManager = createReducerManager<typeof reducers>(reducers);
   const store = configureStore({
      reducer: reducerManager.reduce,
      middleware: (getMiddleware) =>getMiddleware().concat([
            toastMiddlewareRedux, //
            loggerMiddlewareRedux,
            ...middlewares,
      ]),
   });
   type StoreWithManager = typeof store & { reducerManager: ReturnType<typeof createReducerManager> };
   (store as StoreWithManager).reducerManager = reducerManager;

   return store as StoreWithManager;
};

const store = makeStore();
export default store;
