import { authReducer } from "./(auth)/services/auth.service";
import { notificationReducer } from "./(notification)/services/notification.service";
import { adminReducer } from "./(admin)/admin.module";
import { profileReducer } from "./profile/services/profile.service";

export default {
   redux: {
      reducers: {
         profile: profileReducer,
         auth: authReducer,
         notification: notificationReducer,
         admin: adminReducer,
      },
      middlewares: [],
   },
};
