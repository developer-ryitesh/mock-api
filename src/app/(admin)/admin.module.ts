import { Router } from "express";
import adminUsersController from "./controllers/admin-users.controller";
import { Auth } from "../../middlewares/auth.middleware";

export default function adminModule() {
    const routes = Router();
    routes.get("/users", [Auth(["ADMIN"])], adminUsersController.geAllUsers);
    routes.delete("/users/:id", [Auth(["ADMIN"])], adminUsersController.deleteUser);
    routes.post("/invite-user", [Auth(["ADMIN"])], adminUsersController.inviteUser);
    routes.post("/user-status", [Auth(["ADMIN"])], adminUsersController.userStatus);
    return routes;
}
