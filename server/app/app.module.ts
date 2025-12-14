import { Router } from "express";
import pkg from "../../package.json";
import AuthModule from "./(auth)/auth.module";
import userModule from "./(user)/user.module";
import notificationModule from "./(notification)/notification.module";

export default function AppModule() {
   const routes = Router();
   routes.get("/", (req, res, next) => {
      res.status(200).json({
         message: "info route",
         data: { name: pkg.name, version: pkg.version, status: "running" },
         success: true,
      });
   });
   routes.use("/notification", notificationModule());
   routes.use("/auth", AuthModule());
   routes.use("/user", userModule());
   return routes;
}
