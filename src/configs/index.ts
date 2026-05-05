import { authReducer } from "@/modules/(auth)/services";
import { notificationReducer, notificationService } from "@/modules/(notification)/services";
import { userReducer } from "@/modules/(user)/services";

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
