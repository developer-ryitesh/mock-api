import { authReducer } from "./(auth)/services/auth.service";
import { notificationReducer } from "./(notification)/services/notification.service";
import { adminReducer } from "./(user)/user.module";

export default {
   redux: {
      reducers: {
         auth: authReducer,
         notification: notificationReducer,
         admin: adminReducer,
      },
      middlewares: [],
   },
};
