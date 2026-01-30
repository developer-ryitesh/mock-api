import { _userContainer } from "./container";

export const userActions = _userContainer.actions;
export const userReducer = _userContainer.reducer;
export const userService = _userContainer as Omit<typeof _userContainer, "reducer" | "actions">;
