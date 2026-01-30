import { _notificationContainer } from "./container";

export const notificationActions = _notificationContainer.actions;
export const notificationReducer = _notificationContainer.reducer;
export const notificationService = _notificationContainer as Omit<typeof _notificationContainer, "reducer" | "actions">;
