import { authReducer } from "./(auth)/services/auth.service";
import { notificationReducer } from "./(notification)/services/notification.service";

export default {
   redux: {
      reducers: {
         auth: authReducer,
         notification: notificationReducer,
      },
      middlewares: [],
   },
};
