import type store from "../store";

export type { IService } from "./service.type";
export type { IBuilder } from "./builder.type";
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
