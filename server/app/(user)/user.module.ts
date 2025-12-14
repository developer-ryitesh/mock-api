import { Router } from "express";
import userController from "./controllers/user.controller";
import { auth } from "../../middlewares/auth.middleware";

export default function userModule() {
   const routes = Router();
   routes.get("/session", [auth.authorize(["USER", "ADMIN"])], userController.session);
   routes.put("/update-profile", [auth.authorize(["USER", "ADMIN"])], userController.updateProfile);
   routes.put("/update-password", [auth.authorize(["USER", "ADMIN"])], userController.updatePassword);
   routes.get("/logout", [auth.authorize(["USER", "ADMIN"])], userController.logout);

   //---ADMIN-------
   routes.get("/all", [auth.authorize(["ADMIN"])], userController.geAllUsers);
   routes.get("/:id", [auth.authorize(["ADMIN"])], userController.geUserById);
   routes.delete("/delete/:id", [auth.authorize(["ADMIN"])], userController.deleteUser);
   routes.post("/invite", [auth.authorize(["ADMIN"])], userController.inviteUser);
   routes.post("/activation", [auth.authorize(["ADMIN"])], userController.userActivation);
   return routes;
}
