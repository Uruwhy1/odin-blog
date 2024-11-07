import express from "express";
import { authenticateJWT, checkAdminRole } from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.fetchAllUsers);
router.get("/:id", userController.fetchUserById);

router.post("/", userController.createUser);

router.put("/", authenticateJWT, userController.updateUser);
router.delete("/", authenticateJWT, userController.deleteUser);

router.post("/login", userController.loginUser);

router.patch(
  "/:id/role",
  authenticateJWT,
  checkAdminRole,
  userController.toggleUserRole
);

export default router;
