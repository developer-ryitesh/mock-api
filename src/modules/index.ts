import * as container from "@/container";

const auth = container.auth;
const user = container.user;
const notification = container.notification;

export const services = {
   auth: auth as Omit<typeof auth, "reducer" | "actions">,
   user: user as Omit<typeof user, "reducer" | "actions">,
   notification: notification as Omit<typeof notification, "reducer" | "actions">,
};

export const actions = {
   auth: auth.actions,
   user: user.actions,
   notification: notification.actions,
};

export const reducers = {
   auth: auth.reducer,
   user: user.reducer,
   notification: notification.reducer,
};
