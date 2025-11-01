import { combineReducers } from "@reduxjs/toolkit";
import store from "../store";

type Param<ReducersType, Names = any> = {
   name: Names;
   reducers: ReducersType;
};

function LazyReduxReducersLoader<ReducersType>({ name, reducers }: Param<ReducersType>) {
   const cr = combineReducers(reducers);
   store.reducerManager.add(name, cr);
   const type = "@@" + name.toUpperCase() + "/INIT";
   store.dispatch({ type });
   return cr;
}
export { LazyReduxReducersLoader };
