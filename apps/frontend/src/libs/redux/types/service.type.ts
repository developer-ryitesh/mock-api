import { type Slice, type SliceCaseReducers, type SliceSelectors } from "@reduxjs/toolkit";

type ISlice<State = any, CaseReducers extends SliceCaseReducers<State> = any, Name extends string = string, Selectors extends SliceSelectors<State> = any, ReducerPath extends string = Name> = Slice<
   State,
   CaseReducers,
   Name,
   ReducerPath,
   Selectors
>;

export interface IService<
   State = any,
   CaseReducers extends SliceCaseReducers<State> = any,
   Name extends string = string,
   Selectors extends SliceSelectors<State> = any,
   ReducerPath extends string = Name
> {
   actions: ISlice<State, CaseReducers, Name, Selectors, ReducerPath>["actions"];
   reducer: ISlice<State, CaseReducers, Name, Selectors, ReducerPath>["reducer"];
}
