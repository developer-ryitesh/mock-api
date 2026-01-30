import { authReducer } from "@/modules/(auth)";
import { notificationReducer, notificationService } from "@/modules/(notification)";
import { userReducer } from "@/modules/(user)";

const configs = {
   rootReducers: {
      auth: authReducer,
      user: userReducer,
      notification: notificationReducer,
   },
   subscribe: {
      api: notificationService.subscribe.api,
   },
};

export default configs;
