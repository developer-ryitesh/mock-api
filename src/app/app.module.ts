import { Router } from "express";
import authModule from "./(auth)/auth.module";
import userModule from "./(user)/user.module";
import adminModule from "./(admin)/admin.module";
import notificationModule from "./(notification)/notification.module";
import getFireBaseConfig from "../libs/firebase/api";

export default function appModule() {
   const routes = Router();
   routes.use("/auth", authModule());
   routes.use("/user", userModule());
   routes.use("/admin", adminModule());
   routes.use("/notification", notificationModule());
   routes.get("/firebase-config",getFireBaseConfig)
   return routes;
}
