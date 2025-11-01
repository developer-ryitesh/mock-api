import { combineReducers } from "@reduxjs/toolkit";

export function createReducerManager<T>(initialReducers: T) {
   const reducers = { ...initialReducers };

   let combinedReducer = combineReducers(reducers);

   return {
      getReducerMap: () => reducers,
      reduce: (state: any, action: any) => {
         return combinedReducer(state, action);
      },
      add: (key: string, reducer: any) => {
         // @ts-ignore
         if (!key || reducers[key]) return;
         // @ts-ignore
         reducers[key] = reducer;
         combinedReducer = combineReducers(reducers);
      },
   };
}
