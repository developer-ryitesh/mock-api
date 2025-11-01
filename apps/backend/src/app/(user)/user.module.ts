import { Router } from "express";
import { Auth } from "../../middlewares/auth.middleware";
import userController from "./controllers/user.controller";

export default function userModule() {
  const routes = Router();
  routes.get("/session", [Auth(["USER", "ADMIN"])], userController.session);
  routes.put("/update-profile", [Auth(["USER", "ADMIN"])], userController.updateProfile);
  routes.put("/update-password", [Auth(["USER", "ADMIN"])], userController.updatePassword);
  return routes;
}
