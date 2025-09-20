import { Router } from "express";
import { Auth } from "../../middlewares/auth.middleware";
import notificationController from "./controllers/notification.controller";

export default function notificationModule() {
   const routes = Router();
   routes.get("/all", [Auth(["USER", "ADMIN"])], notificationController.getNotifications);
   routes.post("/subscribe", [Auth(["USER", "ADMIN"])], notificationController.subscribe);
   routes.patch("/read", [Auth(["USER", "ADMIN"])], notificationController.markAsRead);
   routes.post("/push", [Auth(["USER", "ADMIN"])], notificationController.pushNotification);
   return routes;
}
