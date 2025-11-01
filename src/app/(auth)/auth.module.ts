import { Router } from "express";
import { Auth } from "../../middlewares/auth.middleware";
import authController from "./controllers/auth.controller";

export default function authModule() {
   const routes = Router();
   routes.post("/login", authController.login);
   routes.post("/register", authController.register);
   routes.get("/refresh-token", authController.refreshToken);
   routes.get("/logout", [Auth(["USER", "ADMIN"])], authController.logout);
   routes.post("/forgot-password", authController.forgotPassword);
   routes.post("/reset-password", authController.resetPassword);
   return routes;
}
