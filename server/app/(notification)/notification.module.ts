import { Router } from "express";
import notificationController from "./controllers/notification.controller";
import { auth } from "../../middlewares/auth.middleware";

export default function notificationModule() {
   const routes = Router();
   routes.get("/all", [auth.authorize(["USER", "ADMIN"])], notificationController.getNotifications);
   routes.post("/subscribe", [auth.authorize(["USER", "ADMIN"])], notificationController.subscribe);
   routes.patch("/read", [auth.authorize(["USER", "ADMIN"])], notificationController.markAsRead);
   routes.post("/push", [auth.authorize(["USER", "ADMIN"])], notificationController.pushNotification);
   return routes;
}
