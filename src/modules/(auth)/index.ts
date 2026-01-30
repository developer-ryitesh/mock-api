import { _authContainer } from "./container";

export const authActions = _authContainer.actions;
export const authReducer = _authContainer.reducer;
export const authService = _authContainer as Omit<typeof _authContainer, "reducer" | "actions">;
