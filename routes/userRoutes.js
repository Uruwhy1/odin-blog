import express from "express";
import { authenticateJWT, authorizeUserUpdate } from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.fetchAllUsers);
router.get("/:id", userController.fetchUserById);

router.post("/", userController.createUser);

router.put(
  "/:id",
  authenticateJWT,
  authorizeUserUpdate,
  userController.updateUser
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeUserUpdate,
  userController.deleteUser
);

router.post("/login", userController.loginUser);

export default router;
