import { Router } from "express";
import authController from "./controllers/auth.controller";

export default function authModule() {
   const routes = Router();
   routes.post("/login", authController.login);
   routes.post("/register", authController.register);
   routes.get("/refresh-token", authController.refreshToken);
   routes.post("/forgot-password", authController.forgotPassword);
   routes.post("/reset-password", authController.resetPassword);
   return routes;
}
// MVC HMVC MVVM MVP    mv mm coordinator VIPER haxagonal Architecture screaming Architecture
