import { User_Role } from "./../../types/index";
import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userController.createUser);
router.get(
  "/",
  auth(User_Role.admin, User_Role.agent, User_Role.user),
  userController.getAllUser,
);
router.get(
  "/:id",
  auth(User_Role.admin, User_Role.agent, User_Role.user),
  userController.getUserById,
);
router.put(
  "/:id",
  auth(User_Role.admin, User_Role.user),
  userController.updateUser,
);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
